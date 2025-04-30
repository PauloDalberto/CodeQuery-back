import { Request, Response } from "express";
import { repoPathService } from "../../services/repo/RepoPathService";

import { setCachedFilesContent } from "../../cache/repoChace";
import { BadRequestError } from "../../helpers/api-error";

export class RepoPathController {
  async get(req: Request, res: Response) {
    const { username, repo } = req.params;

    if (!username || !repo) {
      throw new BadRequestError("Usuario ou repositório não informados!")
    }

    const filesContent = await repoPathService({ username, repo });

    setCachedFilesContent(filesContent); 

    res.json({ message: "Repositório carregado com sucesso." });
  }
}
