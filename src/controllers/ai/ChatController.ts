import { Request, Response } from "express";

import { getCachedFilesContent } from "../../cache/repoChace";
import { BadRequestError, NotFoundError } from "../../helpers/api-error";
import { ChatService } from "../../services/ai/chatService";

export class ChatController {
  async handleChat(req: Request, res: Response) {
    const { message, userId } = req.body;
    const { conversationId } = req.params;

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