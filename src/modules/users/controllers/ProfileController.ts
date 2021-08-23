import { Response, Request } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUserService';
import ShowProfileService from '../services/ShowProfileService';
import ShowUserService from '../services/ShowUserService';
import UpdateProfileService from '../services/UpdateProfileService';
import UpdateUserService from '../services/UpdateUserService';

class ProfilleController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = new ShowProfileService();

    const user = await showProfile.execute({ user_id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;

    const user_id = request.user.id;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(user);
  }
}

export default ProfilleController;
