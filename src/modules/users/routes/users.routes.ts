import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';

const userRouter = Router();

const userController = new UsersController();

const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

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
userRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default userRouter;
