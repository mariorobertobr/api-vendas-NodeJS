import { Router } from 'express';
import UsersController from '../controllers/UsersController';
const userRouter = Router();
const userController = new UsersController();
userRouter.post('/', userController.create);
userRouter.delete('/:id', userController.delete);

export default userRouter;
