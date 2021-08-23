import { getCustomRepository } from 'typeorm';
import Costumer from '../typeorm/entities/Costumer';
import CostumersRepository from '../typeorm/repositories/CostumersRepository';

class ListCostumerService {
  public async execute(): Promise<Costumer[]> {
    const costumersRepository = getCustomRepository(CostumersRepository);

    const costumers = costumersRepository.find();

    return costumers;
  }
}
export default ListCostumerService;
