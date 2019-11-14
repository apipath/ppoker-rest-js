import { Router } from 'express';
import roomsRouter from './rooms';
import { NotFoundError } from '../errors';

const router = Router();

router.get('/', () => {
  throw new NotFoundError('/', 'Route not found');
});
router.use('/rooms', roomsRouter);

export default router;
