import { RoomInterface } from '../entity/Room';
import {
  ERROR_ROOM_CREATE_EMPTY_DATA,
  ERROR_ROOM_CREATE_EMPTY_OPTIONS,
  ERROR_ROOM_CREATE_EMPTY_DATA_MESSAGE,
  ERROR_ROOM_CREATE_EMPTY_OPTIONS_MESSAGE,
} from '../routes/strings';

export enum ValidationRoomStatus {
  OK,
  INVALID,
}

export interface RoomValidationResult {
  error?: string;
  message?: string;
  status: ValidationRoomStatus;
}

export function validateRoom(newRoom: RoomInterface): RoomValidationResult {
  if (newRoom == null) {
    return {
      status: ValidationRoomStatus.INVALID,
      error: ERROR_ROOM_CREATE_EMPTY_DATA,
      message: ERROR_ROOM_CREATE_EMPTY_DATA_MESSAGE,
    };
  }

  const { options = [] } = newRoom;

  if (options == null || options.length < 1) {
    return {
      status: ValidationRoomStatus.INVALID,
      error: ERROR_ROOM_CREATE_EMPTY_OPTIONS,
      message: ERROR_ROOM_CREATE_EMPTY_OPTIONS_MESSAGE,
    };
  }

  return { status: ValidationRoomStatus.OK };
}
