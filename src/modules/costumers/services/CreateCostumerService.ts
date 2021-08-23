import AppError from '@shared/errors/AppError';
import CostumersRepository from '../typeorm/repositories/CostumersRepository';
import Costumer from '../typeorm/entities/Costumer';
import { getCustomRepository } from 'typeorm';

interface IRequestUser {
  name: string;
  email: string;
}
class CreateCostumerService {
  public async execute({ name, email }: IRequestUser): Promise<Costumer> {
    const costumersRepository = getCustomRepository(CostumersRepository);

    const costumerExists = await costumersRepository.findByEmail(email);

    if (costumerExists) {
      throw new AppError('email already exists');
    }

    const customer = costumersRepository.create({
      name,
      email,
    });

    await costumersRepository.save(customer);

    return customer;
  }
}

export default CreateCostumerService;
