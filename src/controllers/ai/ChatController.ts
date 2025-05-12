import { Request, Response } from "express";
import { getCachedFilesContent } from "../../cache/repoChace";
import { BadRequestError, NotFoundError } from "../../helpers/api-error";
import { ChatService } from "../../services/ai/chatService";
import { conversationRepository } from "../../repositories/conversationRepository";

export class ChatController {
  async handleChat(req: Request, res: Response) {
    const { message } = req.body;
    const { uuid } = req.params; 
    const userId = req.user.id;

    if (!userId) {
      throw new BadRequestError("Não foi encontrado esse usuário.");
    }

    if (!message) {
      throw new BadRequestError("Mensagem é obrigatória.");
    }

    const conversation = await conversationRepository.findOne({
      where: { uuid },
      relations: ["messages"],
    });

    if (!conversation) {
      throw new NotFoundError("Conversa não encontrada.");
    }

    const filesContent = getCachedFilesContent();

    if (!filesContent || Object.keys(filesContent).length === 0) {
      throw new NotFoundError("Repositório não carregado. Busque o repositório primeiro.");
    }

    try {
      const reply = await ChatService.sendMessage({
        message,
        conversation,
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
