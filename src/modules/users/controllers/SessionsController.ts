import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

class SessionsController {
  public async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionService();

    const user = await createSession.execute({ email, password });

    return response.json(user);
  }
}
export default SessionsController;
