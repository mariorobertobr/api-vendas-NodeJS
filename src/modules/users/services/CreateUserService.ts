import AppError from '@shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

interface IRequestUser {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  public async execute({ name, email, password }: IRequestUser): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const userExists = await userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('email already exists');
    }
    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
