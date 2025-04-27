import { Request, Response } from 'express';
import { repoPathService } from '../../services/repo/RepoPathService';
import { BadRequestError } from '../../helpers/api-error';

export class RepoPathController {
  async get(req: Request, res: Response) {
    const { username, repo } = req.params;

    try {

      const response = await repoPathService({ username, repo });
      res.json({ message: 'Arquivos lidos com sucesso!' });
      return response;
    } catch (err) {
      console.log(err)
      throw new BadRequestError('Erro ao buscar conteúdo dos arquivos!');
    }
  }
}
