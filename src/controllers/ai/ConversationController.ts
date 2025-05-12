import { Request, Response } from "express";
import { ConversationService } from "../../services/ai/ConversationService";
import { BadRequestError } from "../../helpers/api-error";

const conversationService = new ConversationService();

export class ConversationController {
  async create(req: Request, res: Response) {
    const { title } = req.body;

    if (!req.user.id) {
      throw new BadRequestError("Usuário não autenticado.")
    }

    const result = await conversationService.create({
      title,
      userId: req.user.id,
    });

    res.status(201).json(result);
  }

  async listByUser(req: Request, res: Response) {
    const userId = req.user.id;

    const conversations = await conversationService.listByUser(Number(userId));

    res.json(conversations);
  }

  async messages(req: Request, res: Response) {
    const { uuid } = req.params;

    const conversation = await conversationService.getMessages(uuid);

    res.json(conversation);
  }

  async updateConversation(req: Request, res: Response) {
    const { uuid } = req.params;
    const { repository, username } = req.body;

    const conversation = await conversationService.updateConversation({
      uuid,
      repository,
      username,
    });

    res.status(200).json(conversation);
  }
}
