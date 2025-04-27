import axios from 'axios';
import { Request, Response } from 'express'
import { BadRequestError } from '../../helpers/api-error';

export class ReposController {
  async get(req: Request, res: Response){
    const { username } = req.params; 

    const response = await axios.get(`https://api.github.com/users/${username}/repos`);

    if(!response){
      throw new BadRequestError('E-mail ou senha inválidos!');
    }

    res.json(response.data)
  }
}