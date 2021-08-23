import { Response, Request } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    return response.json(user);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();

    const users = await listUsers.execute();

    return response.json(users);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const userShow = new ShowUserService();

    const user = await userShow.execute({ id });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = new DeleteUserService();

    const user = await deleteUser.execute({ id });

    return response.json({ user, message: 'Product deleted' }).status(200);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, password } = request.body;

    const { id } = request.params;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({ id, name, password });

    return response.json(user);
  }
}

export default UsersController;
