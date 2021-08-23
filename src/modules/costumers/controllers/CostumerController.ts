import { Request, Response } from 'express';
import CreateCostumerService from '../services/CreateCostumerService';
import DeleteCostumerService from '../services/DeleteCostumerService';
import ListCostumerService from '../services/ListCostumerService';
import ShowCostumerService from '../services/ShowCostumerService';
import UpdateCostumerService from '../services/UpdateCostumerService';

class CostumerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCostumers = new ListCostumerService();

    const costumers = await listCostumers.execute();

    return response.json(costumers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCostumer = new ShowCostumerService();

    const costumer = await showCostumer.execute({ id });

    return response.json(costumer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCostumer = new CreateCostumerService();

    const costumer = await createCostumer.execute({ name, email });

    return response.json(costumer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const { id } = request.params;

    const updateCostumer = new UpdateCostumerService();

    const costumer = await updateCostumer.execute({ id, name, email });

    return response.json(costumer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCostumer = new DeleteCostumerService();

    const costumer = await deleteCostumer.execute({ id });

    return response.json({ costumer, message: 'Product deleted' }).status(200);
  }
}
export default CostumerController;
