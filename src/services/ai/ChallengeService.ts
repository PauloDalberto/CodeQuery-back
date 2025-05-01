import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export class ChatService {
  static async sendMessage(message: string, filesContent: { [key: string]: string }) {
    let filesMessage = 'Conteúdo dos arquivos:\n\n';

    for (const [filePath, content] of Object.entries(filesContent)) {
      filesMessage += `### Arquivo: ${filePath}\n\`\`\`ts\n${content}\n\`\`\`\n\n`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
                Você é uma IA especialista em programação (nível sênior).; 
                Seu trabalho é analisar o repositório abaixo e conversar com o usuário.

                - Responda quando necessário em **Markdown** com formatações como \`código\`, listas, títulos etc.
                - Não invente. Responda **somente com base no código** fornecido.
                - Arquivos abaixo:\n\n${filesMessage}

                Agora responda a esta pergunta do usuário:
                "${message}"
              `
            }
          ]
        }
      ]
    });

    return response.text;
  }
}
