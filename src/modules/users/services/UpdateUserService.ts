import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
interface IRequest {
  id: string;
  name: string;
  password: string;
}
class UpdateUserService {
  public async execute({ id, name, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError(`id não existe na aplicação`);
    }
    const userAlreadyExists = await usersRepository.findByName(name);

    if (userAlreadyExists) {
      throw new AppError(`produto com o mesmo nome já existe na base`);
    }

    user.name = name;
    user.password = password;

    await usersRepository.save(user);

    return user;
  }
}
export default UpdateUserService;
