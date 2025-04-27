import axios from 'axios';
import { Request, Response } from 'express'
import { BadRequestError } from '../../helpers/api-error';

export class RepoContentController {
  async get(req: Request, res: Response){
    const { username, repo } = req.params; 

    const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/contents`);

    if(!response){
      throw new BadRequestError('E-mail ou senha inválidos!');
    }

    res.json(response.data)
  }
}