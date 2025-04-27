import { Request, Response } from "express";
import { ChatService } from "../../services/ai/chatService";
import { RepoPathController } from "../repo/RepoPathController";

export class ChatController {
  async handleChat(req: Request, res: Response) {
    const { message } = req.body;

    try {
      // const repoFilesContent = RepoPathController.getRepoFiles();

      // const reply = await ChatService.sendMessage(message, repoFilesContent);

      // res.json({ reply });
    } catch (error) {
      console.error("Erro no ChatService:", error);
      res.status(500).json({ error: "Erro ao processar a mensagem" });
    }
  }
}
