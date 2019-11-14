import { Router } from 'express';
import { getRepository } from 'typeorm';
import * as asyncHandler from 'express-async-handler';
import * as HttpStatus from 'http-status-codes';
import { validate } from 'class-validator';

import { Room } from '../entity/Room';
import { Option } from '../entity/Option';
import { NotFoundError, UnprocessableEntityError } from '../errors';

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
      throw new NotFoundError('ROOM_GET_BY_ID', 'Room does not exists');
    } else {
      res.send({ data: room });
    }
  }),
);

// TODO: discuss if it's fine that types are verbs.
type CreateRoom = {
  name?: string;
  description?: string;
  options: Array<{
    label?: string;
    value?: string;
  }>;
};

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const body: CreateRoom = req.body;

    if (!body || Array.from(body.options).length < 1) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY);
      res.send();
      return;
    }

    const room = new Room();
    room.name = body.name;
    room.description = body.description;
    room.options = body.options.map(params => {
      const option = new Option();
      option.label = params.label;
      option.value = params.value;

      return option;
    });
    const errors = await validate(room);
    if (errors.length > 0) {
      // TODO: use logger
      throw new UnprocessableEntityError(
        'ROOM_CREATE_VALIDATION_ERROR',
        errors[0].toString(),
      );
    }

    await getRepository(Room).save(room);
    res.status(HttpStatus.CREATED);
    res.send({ data: room });
  }),
);

export default router;
