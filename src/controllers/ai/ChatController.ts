import { Request, Response } from "express";

import { getCachedFilesContent } from "../../cache/repoChace";
import { BadRequestError, NotFoundError } from "../../helpers/api-error";
import { ChatService } from "../../services/ai/chatService";

export class ChatController {
  async handleChat(req: Request, res: Response) {
    const { message } = req.body;
    const { conversationId } = req.params;
    const userId = req.user.id

    if(!userId){
      throw new BadRequestError("Não foi encontrado esse usuario")
    }

    if (!message) {
      throw new BadRequestError("Mensagem é obrigatória");
    }

    const filesContent = getCachedFilesContent();

    if (!filesContent || Object.keys(filesContent).length === 0) {
      throw new NotFoundError("Repositório não carregado. Busque o repositório primeiro.");
    }

    try {
      const reply = await ChatService.sendMessage({
        message,
        conversationId: Number(conversationId),
        filesContent,
        userId,
      });

      res.json({ reply });
    } catch (error) {
      console.error("Erro no ChatService:", error);
      res.status(500).json({ error: "Erro ao processar a mensagem" });
    }
  }
}