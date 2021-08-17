import AppError from '@shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequestUser {
  user_id: string;
  avatarFilename?: string;
}
class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFilename,
  }: IRequestUser): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;

    await userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
