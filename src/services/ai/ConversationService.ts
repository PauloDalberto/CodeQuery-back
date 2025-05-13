import { conversationRepository } from "../../repositories/conversationRepository";
import { NotFoundError } from "../../helpers/api-error";
import { CreateConversationDTO, UpdateConversationDTO } from "../../dtos/ConversationDTO";
import { messageRepository } from "../../repositories/messageRepository";

export class ConversationService {
  async create({ title, userId }: CreateConversationDTO) {
    const conversation = conversationRepository.create({
      title,
      user: { id: userId },
    });

    await conversationRepository.save(conversation);

    return { uuid: conversation.uuid, title: conversation.title };
  }

  async listByUser(userId: number) {
    const conversations = await conversationRepository.find({
      where: { user: { id: userId } },
      select: ["id", "uuid", "title", "repository", "username"],
      relations: ["messages"],
    });

    return conversations;
  }

  async getMessages(uuid: string) {
    const conversation = await conversationRepository.findOne({
      where: { uuid },
      relations: ["messages"],
    });

    if (!conversation) {
      throw new NotFoundError("Conversa não encontrada.");
    }

    return conversation;
  }

  async updateConversation({ uuid, repository, username }: UpdateConversationDTO) {
    const conversation = await conversationRepository.findOne({
      where: { uuid },
    });

    if (!conversation) {
      throw new NotFoundError("Erro, conversa não existe");
    }

    conversation.repository = repository;
    conversation.username = username;

    await conversationRepository.save(conversation);

    return conversation;
  }

  async deleteConversation(uuid: string){
    const conversation = await conversationRepository.findOne({
      where: { uuid },
      relations: ["messages"],
    });

    if(!conversation){
      throw new NotFoundError("Conversa não encontrada");
    }

    if (conversation.messages.length > 0) {
      await messageRepository.remove(conversation.messages);
    }

    await conversationRepository.delete({ uuid })
  }
}
