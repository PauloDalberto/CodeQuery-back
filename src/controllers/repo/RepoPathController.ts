import { Request, Response } from "express";
import { repoPathService } from "../../services/repo/RepoPathService";
import { setCachedFilesContent } from "../../cache/repoChace";
import { BadRequestError } from "../../helpers/api-error";
import { saveRepoDataService } from "../../services/repo/SaveRepoDataService";

export class RepoPathController {
  async get(req: Request, res: Response) {
    const { username, repo } = req.params;
    const { uuid } = req.query as { uuid: string };

    if (!username || !repo || !uuid) {
      throw new BadRequestError("Usuário, repositório ou UUID não informados!");
    }

    const filesContent = await repoPathService({ username, repo });

    setCachedFilesContent(filesContent);

    await saveRepoDataService({ uuid, filesContent });

    res.json({ message: "Repositório carregado e salvo com sucesso." });
  }
}
