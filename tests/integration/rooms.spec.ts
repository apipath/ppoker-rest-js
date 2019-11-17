import { setup, clearDb, get, post } from '../utils';
import { getRepository } from 'typeorm';
import * as HttpStatus from 'http-status-codes';

import { Room } from '../../src/entity/Room';

describe('Rooms Routes', () => {
  beforeAll(setup);
  beforeEach(clearDb);

  describe('GET /rooms/:id', () => {
    it('should return a room', async () => {
      const room = await getRepository(Room).save({
        name: 'foo',
        description: 'bar',
        options: [{ label: 'option label', value: 'option value' }],
      });
      const res = await get(`/rooms/${room.id}`);
      expect(res.status).toEqual(HttpStatus.OK);
      expect(res.body).toHaveProperty('data', { ...room });
    });

    it("should a 404 error if a room doesn't exists", async () => {
      const res = await get(`/rooms/non-existent-id`);
      expect(res.status).toEqual(HttpStatus.NOT_FOUND);
    });
  });

  const buildRoom = ({
    name = 'foo',
    description = 'bar',
    options = [],
  } = {}) => ({
    name,
    description,
    options,
  });

  describe('POST /rooms', () => {
    it('should create a room', async () => {
      const room = buildRoom({
        options: [{ label: 'option label', value: 'option value' }],
      });
      const res = await post('/rooms', room);
      expect(res.status).toEqual(HttpStatus.CREATED);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toMatchObject(room);
    });

    it('should return an error if no options are sent', async () => {
      const roomWithNoOptions = buildRoom({
        options: undefined,
      });
      const res = await post('/rooms', roomWithNoOptions);
      expect(res.status).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
      expect(res.body).toHaveProperty(
        'error.status',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    });

    it('should return an error if empty options are sent', async () => {
      const roomWithEmptyOptionsArray = buildRoom({ options: [] });
      const res = await post('/rooms', roomWithEmptyOptionsArray);
      expect(res.status).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
      expect(res.body).toHaveProperty(
        'error.status',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    });

    it('should return an error if options without value are sent', async () => {
      const roomWithInvalidOptions = buildRoom({
        options: [
          { label: 'option label', value: 'option value' },
          { label: 'option without value' },
        ],
      });
      const res = await post('/rooms', roomWithInvalidOptions);
      expect(res.status).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
      expect(res.body).toHaveProperty(
        'error.status',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    });
  });
});
