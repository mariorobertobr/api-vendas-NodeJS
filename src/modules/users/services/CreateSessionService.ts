import AppError from '@shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';

interface IRequestUser {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
class CreateSessionService {
  public async execute({ email, password }: IRequestUser): Promise<IResponse> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('email ou senha incorretos', 401);
    }
    const passConfirmed = await compare(password, user.password);

    if (!passConfirmed) {
      throw new AppError('email ou senha incorretos', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
