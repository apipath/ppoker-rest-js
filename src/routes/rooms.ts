import { Router } from 'express';
import { getRepository } from 'typeorm';
import * as asyncHandler from 'express-async-handler';
import * as HttpStatus from 'http-status-codes';
import { validate } from 'class-validator';

import { Room, RoomInterface } from '../entity/Room';
import { Option, OptionInterface } from '../entity/Option';
import { NotFoundError, UnprocessableEntityError } from '../errors';
import {
  ERROR_ROOM_GET_BY_ID,
  ERROR_ROOM_CREATE_VALIDATION,
  ERROR_ROOM_GET_BY_ID_MESSAGE,
} from './strings';
import { ValidationRoomStatus, validateRoom } from '../validation/rooms';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const rooms = await getRepository(Room).find({ relations: ['options'] });
    res.send({ data: rooms });
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const room = await getRepository(Room).findOne(id, {
      relations: ['options'],
    });

    if (!room) {
      throw new NotFoundError(
        ERROR_ROOM_GET_BY_ID,
        ERROR_ROOM_GET_BY_ID_MESSAGE,
      );
    } else {
      res.send({ data: room });
    }
  }),
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const newRoom: RoomInterface = req.body;
    const { status, error, message } = validateRoom(newRoom);

    if (status === ValidationRoomStatus.INVALID) {
      throw new UnprocessableEntityError(error, message);
    }

    const room: Room = new Room();
    room.name = newRoom.name;
    room.description = newRoom.description || 'empty description';
    room.options = newRoom.options.map(Option.New);

    const [validationError] = await validate(room);
    if (validationError) {
      throw new UnprocessableEntityError(
        ERROR_ROOM_CREATE_VALIDATION,
        validationError.toString(),
      );
    }

    await getRepository(Room).save(room);

    res.status(HttpStatus.CREATED);
    res.send({ data: room });
  }),
);

export default router;
