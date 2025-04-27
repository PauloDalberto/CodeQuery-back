import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export class ChatService {
  static async sendMessage(message: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const result = await model.generateContent(
      `Você é um assistente que ajuda a entender códigos de repositórios GitHub.\n\nUsuário: ${message}`
    );

    const response = result.response;
    return result.response.text();
  }
}
