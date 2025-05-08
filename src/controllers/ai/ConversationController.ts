import { Request, Response } from "express";
import { conversationRepository } from "../../repositories/conversationRepository";
import { messageRepository } from "../../repositories/messageRepository";
import { BadRequestError } from "../../helpers/api-error";

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

  async messages(req: Request, res: Response) {
    const { id } = req.params;
  
    if (isNaN(Number(id))) {
      throw new BadRequestError("ID Inválido")
    }
  
    const conversation = await conversationRepository.findOne({
      where: { id: Number(id) },
      relations: ["messages"],
    });

    if (!conversation) {
      throw new BadRequestError("Conversa não encontrada.")
    }
    res.json(conversation);
  }
}
