import { AppDataSource } from "../data-source";
import { Conversation } from "../entities/Conversation";

export const conversationRepository = AppDataSource.getRepository(Conversation)