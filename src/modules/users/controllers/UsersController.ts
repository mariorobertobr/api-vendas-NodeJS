import { Response, Request } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, avatar } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password, avatar });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = new DeleteUserService();

    const user = await deleteUser.execute({ id });

    return response.json({ user, message: 'Product deleted' }).status(200);
  }
}

export default UsersController;
