import AppError from '@shared/errors/AppError';

import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
interface IRequestUser {
  token: string;
  password: string;
}
class ResetPasswordService {
  public async execute({ token, password }: IRequestUser): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('user token not valid');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('usuario nao existe');
    }

    const tokenCreatedAt = userToken.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('token expirado');
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
