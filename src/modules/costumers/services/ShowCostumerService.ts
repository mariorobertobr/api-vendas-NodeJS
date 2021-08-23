import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Costumer from '../typeorm/entities/Costumer';
import CostumersRepository from '../typeorm/repositories/CostumersRepository';

interface IRequest {
  id: string;
}
class ShowCostumerService {
  public async execute({ id }: IRequest): Promise<Costumer> {
    const costumersRepository = getCustomRepository(CostumersRepository);

    const costumer = await costumersRepository.findById(id);

    if (!costumer) {
      throw new AppError('Costumer not found');
    }

    return costumer;
  }
}
export default ShowCostumerService;
