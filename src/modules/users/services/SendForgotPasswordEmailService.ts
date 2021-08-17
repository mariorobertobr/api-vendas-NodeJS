import AppError from '@shared/errors/AppError';

import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IRequestUser {
  email: string;
}
class SendForgotPasswordEmailService {
  public async execute({ email }: IRequestUser): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);

    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('email not found');
    }

    console.log(user);

    const token = await userTokenRepository.generate(user.id);

    console.log(token);
  }
}

export default SendForgotPasswordEmailService;
