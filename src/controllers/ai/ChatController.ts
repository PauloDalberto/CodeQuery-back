import { Request, Response } from "express";
import { ChatService } from "../../services/ai/chatService";
import { getCachedFilesContent } from "../../cache/repoChace";

export class ChatController {
  async handleChat(req: Request, res: Response) {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Mensagem é obrigatória." });
    }

    const filesContent = getCachedFilesContent();

    if (!filesContent || Object.keys(filesContent).length === 0) {
      return res.status(400).json({ error: "Repositório não carregado. Busque o repositório primeiro." });
    }

    try {
      const reply = await ChatService.sendMessage(message, filesContent);
      res.json({ reply });
    } catch (error) {
      console.error("Erro no ChatService:", error);
      res.status(500).json({ error: "Erro ao processar a mensagem" });
    }
  }
}
