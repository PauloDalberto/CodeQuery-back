import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export class ChatService {
  static async sendMessage(message: string, filesContent: { [key: string]: string }) {
    let filesMessage = 'Conteúdo dos arquivos:\n\n';

    for (const [filePath, content] of Object.entries(filesContent)) {
      filesMessage += `Arquivo: ${filePath}\n${content}\n\n`;
    }

    const fullMessage = `Você é um assistente que ajuda a entender códigos de repositórios GitHub.\n\nUsuário: ${message}\n\n${filesMessage}`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const result = await model.generateContent(fullMessage);

    const response = result.response;
    return response.text();
  }
}
