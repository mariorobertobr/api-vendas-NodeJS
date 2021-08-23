import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Costumer from '../typeorm/entities/Costumer';
import CostumersRepository from '../typeorm/repositories/CostumersRepository';
interface IRequest {
  id: string;
  name: string;
  email: string;
}
class UpdateCostumerService {
  public async execute({ id, name, email }: IRequest): Promise<Costumer> {
    const costumersRepository = getCustomRepository(CostumersRepository);

    const costumer = await costumersRepository.findOne(id);

    if (!costumer) {
      throw new AppError(`customer not found`);
    }
    const costumerExists = await costumersRepository.findByName(name);

    if (costumerExists && email !== costumer.email) {
      throw new AppError(`there is already a customer with this email`);
    }

    costumer.name = name;
    costumer.email = email;

    await costumersRepository.save(costumer);

    return costumer;
  }
}
export default UpdateCostumerService;
