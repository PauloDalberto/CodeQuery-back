import { Request, Response } from 'express'
import LoginService from '../../services/user/LoginService';

export class LoginController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const loginService = new LoginService();

    const login = await loginService.login({ email, password });

    res.json(login);
  }

  async getProfile(req: Request, res: Response){    
    res.json(req.user);
  }
}