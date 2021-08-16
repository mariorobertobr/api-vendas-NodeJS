import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError(`id não existe na aplicação`);
    }
    const produtAlreadyExists = await productsRepository.findByName(name);

    if (produtAlreadyExists) {
      throw new AppError(`produto com o mesmo nome já existe na base`);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}
export default UpdateProductService;
