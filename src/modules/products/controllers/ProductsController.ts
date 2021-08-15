import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listproducts = new ListProductService();

    const products = await listproducts.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showproduct = new ShowProductService();

    const product = await showproduct.execute({ id });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteproduct = new DeleteProductService();

    const product = await deleteproduct.execute({ id });

    return response.json({ product, message: 'Product deleted' }).status(200);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createproduct = new CreateProductService();

    const product = await createproduct.execute({ name, price, quantity });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const { id } = request.params;

    const updateproduct = new UpdateProductService();

    const product = await updateproduct.execute({ id, name, price, quantity });

    return response.json(product);
  }
}
export default ProductsController;
