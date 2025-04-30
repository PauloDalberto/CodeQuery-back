import axios from 'axios';
import { Request, Response } from 'express'
import { BadRequestError } from '../../helpers/api-error';
import { RepoService } from '../../services/repo/RepoService';

export class ReposController {
  async get(req: Request, res: Response){
    const { username } = req.params; 

    const repoService = new RepoService();

    const repo = await repoService.getProfile({ username })

    res.json(repo);
  }
}