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
  
    res.status(201).json({ uuid: conversation.uuid, title: conversation.title });
  }
  
  async listByUser(req: Request, res: Response) {
    const userId = req.user.id;
  
    const conversations = await conversationRepository.find({
      where: { user: { id: Number(userId) } },
      select: ["id", "uuid", "title", "repository", "username"],
      relations: ["messages"],
    });
  
    res.json(conversations);
  }  

  async messages(req: Request, res: Response) {
    const { uuid } = req.params;
  
    const conversation = await conversationRepository.findOne({
      where: { uuid },
      relations: ["messages"],
    });
  
    if (!conversation) {
      throw new BadRequestError("Conversa não encontrada.");
    }
  
    res.json(conversation);
  }  

  async updateConversation(req: Request, res: Response) {
    const { uuid } = req.params;
    const { repository, username } = req.body;

    const conversation = await conversationRepository.findOne({
      where: { uuid },
    });

    if (!conversation) {
      throw new BadRequestError("Erro, conversa nao existe")
    }

    conversation.repository = repository;
    conversation.username = username;

    await conversationRepository.save(conversation);

    res.status(200).json(conversation);
  }

}
