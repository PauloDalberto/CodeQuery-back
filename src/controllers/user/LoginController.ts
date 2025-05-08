import { Request, Response } from 'express'
import LoginService from '../../services/user/LoginService';

export class LoginController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const loginService = new LoginService();

    const { token, user } = await loginService.login({ email, password });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60
    })

    res.json({ user });
  }

  async getProfile(req: Request, res: Response){    
    res.json(req.user);
  }
}