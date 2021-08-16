import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../middlewares/isAuthenticated';

const userRouter = Router();
const userController = new UsersController();
userRouter.get('/', isAuthenticated, userController.index);
userRouter.get('/:id', userController.show);
userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.delete);

export default userRouter;
