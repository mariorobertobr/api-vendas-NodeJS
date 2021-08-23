import { EntityRepository, Repository } from 'typeorm';
import Costumer from '../entities/Costumer';

@EntityRepository(Costumer)
class CostumersRepository extends Repository<Costumer> {
  public async findByName(name: string): Promise<Costumer | undefined> {
    const costumer = await this.findOne({ where: { name } });

    return costumer;
  }

  public async findById(id: string): Promise<Costumer | undefined> {
    const costumer = await this.findOne({ where: { id } });

    return costumer;
  }

  public async findByEmail(email: string): Promise<Costumer | undefined> {
    const costumer = await this.findOne({ where: { email } });

    return costumer;
  }
}

export default CostumersRepository;
