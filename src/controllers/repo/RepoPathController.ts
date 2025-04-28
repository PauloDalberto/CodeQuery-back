import { Request, Response } from "express";
import { repoPathService } from "../../services/repo/RepoPathService";

import { setCachedFilesContent } from "../../cache/repoChace";

export class RepoPathController {
  async get(req: Request, res: Response) {
    const { username, repo } = req.params;

    if (!username || !repo) {
      return res.status(400).json({ error: "Username e repo obrigatórios." });
    }

    try {
      const filesContent = await repoPathService({ username, repo });

      setCachedFilesContent(filesContent); 

      res.json({ message: "Repositório carregado com sucesso." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao carregar o repositório." });
    }
  }
}
