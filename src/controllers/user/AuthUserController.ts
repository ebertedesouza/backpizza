import { Request, Response } from 'express';
import { AuthUserService } from '../../services/user/AuthUserService';

class AuthUserController {
  async handle(req: Request, res: Response) {
    console.log ("Inicio Controller");
    const { email, password } = req.body;

    const authUserService = new AuthUserService();
    console.log ("Serviço criado");
    try {
      const auth = await authUserService.execute({ email, password });
      return res.json(auth);
    } catch (error) {
      console.log (error);
      return res.status(400).json({ error: error.message });
    }
  }
}

export { AuthUserController };
