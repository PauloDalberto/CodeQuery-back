import { Request, Response } from "express";
import { getCachedFilesContent } from "../../cache/repoChace";
import { BadRequestError, NotFoundError } from "../../helpers/api-error";
import { ChatService } from "../../services/ai/chatService";

export class ChatController {
  async handleChat(req: Request, res: Response) {
    const { message } = req.body;

    if (!message) {
      throw new BadRequestError("Mensagem é obrigatória");
    }

    const filesContent = getCachedFilesContent();

    if (!filesContent || Object.keys(filesContent).length === 0) {
      throw new NotFoundError("Repositório não carregado. Busque o repositório primeiro.");
    }

    const reply = await ChatService.sendMessage(message, filesContent);
    
    res.json({ reply });
  }
}
