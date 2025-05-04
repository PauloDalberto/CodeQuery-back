import { Request, Response } from "express";
import { conversationRepository } from "../../repositories/conversationRepository";

export class ConversationController {
  async create(req: Request, res: Response) {
    const { title } = req.body;

    const conversation = conversationRepository.create({
      title,
      user: { id: req.user.id },
    });

    await conversationRepository.save(conversation);

    res.status(201).json(conversation);
  }

  async listByUser(req: Request, res: Response) {
    const userId = req.user.id;

    const conversations = await conversationRepository.find({
      where: { user: { id: Number(userId) } },
      relations: ["messages"]
    });

    res.json(conversations);
  }
}
