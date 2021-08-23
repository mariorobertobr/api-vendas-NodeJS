import AppError from '@shared/errors/AppError';
import CostumersRepository from '../typeorm/repositories/CostumersRepository';
import { getCustomRepository } from 'typeorm';

interface IUserRequest {
  id: string;
}

class DeleteCostumerService {
  public async execute({ id }: IUserRequest): Promise<void> {
    const constumersRepository = getCustomRepository(CostumersRepository);
    const costumer = await constumersRepository.findOne(id);
    if (!costumer) {
      throw new AppError('customer not found');
    }
    await constumersRepository.remove(costumer);
  }
}

export default DeleteCostumerService;
