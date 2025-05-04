import { Request, Response } from "express";
import { conversationRepository } from "../../repositories/conversationRepository";

export class ConversationController {
  async create(req: Request, res: Response) {
    const { title, userId } = req.body;

    const conversation = conversationRepository.create({
      title,
      user: { id: userId },
    });

    await conversationRepository.save(conversation);

    res.status(201).json(conversation);
  }

  async listByUser(req: Request, res: Response) {
    const { userId } = req.params;

    const conversations = await conversationRepository.find({
      where: { user: { id: Number(userId) } },
      relations: ["messages"]
    });

    res.json(conversations);
  }
}
