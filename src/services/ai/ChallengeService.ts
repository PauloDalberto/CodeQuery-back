import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { messageRepository } from "../../repositories/messageRepository";
import { BadRequestError } from "../../helpers/api-error";
import { Conversation } from "../../entities/Conversation";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export class ChallengeService {
  static async sendMessage({
    message,
    conversation,
    filesContent,
  }: {
    message: string;
    conversation: Conversation; 
    filesContent?: { [key: string]: string };
    userId: number;
  }) {
    if (!conversation) {
      throw new BadRequestError("Conversa não encontrada!");
    }

    const userMessage = messageRepository.create({
      role: "user",
      content: message,
      conversation,
    });
    await messageRepository.save(userMessage);

    const history = conversation.messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    let filesMessage = "";
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
            Seu trabalho é analisar o repositório abaixo e fazer desafios com o usuário.
            O desafio consiste em indicar melhorias, lugares onde possa fazer refatoração, lugares que voce indicaria uma outra abordagem
            A sua exclusiva função é ajudar o usuario com esses desafios.

            - Leia todos os arquivos com atenção.
            - Esteja pronto para tirar analisar as duvidas do usuário e explicar funções detalhadamente quando o usuário pedir.
            - Responda quando necessário em **Markdown** com formatações como \`código\`, listas, títulos etc.
            - Não invente. Forneça desafio e refatoração **somente com base no código** fornecido.

            Arquivos abaixo:\n\n${filesMessage}`,
        },
      ],
    });

    history.push({
      role: "user",
      parts: [{ text: message }],
    });

    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: history,
    });

    const answerText = result.text;

    const modelMessage = messageRepository.create({
      role: "model",
      content: answerText,
      conversation,
    });
    await messageRepository.save(modelMessage);

    console.log("Mensagens da conversa:", conversation.messages);

    return answerText;
  }
}
