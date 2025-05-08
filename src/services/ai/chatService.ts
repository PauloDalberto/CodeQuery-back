import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { conversationRepository } from "../../repositories/conversationRepository";
import { messageRepository } from "../../repositories/messageRepository";
import { BadRequestError } from "../../helpers/api-error";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export class ChatService {
  static async sendMessage({
    message,
    conversationId,
    filesContent
  }: {
    message: string;
    conversationId: number;
    filesContent?: { [key: string]: string };
    userId: number;
  }) {
    const conversation = await conversationRepository.findOne({
      where: { id: conversationId },
      relations: ["messages"]
    });

    if (!conversation) {
      throw new BadRequestError("Conversa não encontrada!");
    }

    const userMessage = messageRepository.create({
      role: "user",
      content: message,
      conversation
    });
    await messageRepository.save(userMessage);

    const history = conversation.messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    let filesMessage = '';
    if (filesContent) {
      for (const [filePath, content] of Object.entries(filesContent)) {
        filesMessage += `Arquivo: ${filePath}\n${content}\n\n`;
      }
    }

    history.unshift({
      role: "user",
      parts: [
        {
          text: `
            Você é uma IA especialista em programação (nível sênior).
            Seu trabalho é analisar o repositório abaixo e conversar com o usuário.

            - Leia todos os arquivos com atenção.
            - Esteja pronto para tirar dúvidas, dar ideias, indicar onde estão os arquivos, e explicar funções detalhadamente quando o usuário pedir.
            - Responda quando necessário em **Markdown** com formatações como \`código\`, listas, títulos etc.
            - Não invente. Responda **somente com base no código** fornecido.

            Arquivos abaixo:\n\n${filesMessage}`
        }
      ]
    });

    history.push({
      role: "user",
      parts: [{ text: message }]
    });

    const result = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: history
    });

    const answerText = result.text;

    const modelMessage = messageRepository.create({
      role: "model",
      content: answerText,
      conversation,
    });
    await messageRepository.save(modelMessage);

    return answerText;
  }
}
