import AppError from '@shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';

interface IUserRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IUserRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findOne(id);
    if (!user) {
      throw new AppError('user not found');
    }
    await userRepository.remove(user);
  }
}

export default DeleteUserService;
