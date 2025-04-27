import { Request, Response } from 'express';
import { BadRequestError } from '../../helpers/api-error';
import { repoPathService } from '../../services/repo/RepoPathService';


export class RepoPathController {
  async get(req: Request, res: Response) {
    const { username, repo } = req.params;
    const path = req.params[0];

    try {
      // Chama o serviço que vai processar os diretórios e arquivos do repositório
      await repoPathService({ username, repo, path });
      res.json({ message: 'Arquivos lidos com sucesso!' });
    } catch (err) {
      // Caso ocorra algum erro, envia uma mensagem para o cliente
      throw new BadRequestError('Erro ao buscar conteúdo dos arquivos!');
    }
  }
}
