import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export class ChatService {
  static async sendMessage(message: string, filesContent: { [key: string]: string }) {
    let filesMessage = 'Conteúdo dos arquivos:\n\n';

    for (const [filePath, content] of Object.entries(filesContent)) {
      filesMessage += `Arquivo: ${filePath}\n${content}\n\n`;
    }
    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: `
        Você é uma inteligência artificial especialista e avançada em programação, como se fosse um desenvolvedor sênior.
        Seu trabalho é ler todo o repositório abaixo e se preparar para conversar com o usuário sobre ele.
  
        - Leia todos os arquivos com atenção.
        - Esteja pronto para tirar dúvidas, dar ideias, indicar onde estão os arquivos, e explicar funções detalhadamente quando o usuário pedir.
        - Não crie suposições; baseie suas respostas apenas no que estiver no código lido.
  
        Aqui está o repositório: ${filesMessage}
  
        - A primeira pergunta do usuário é: ${message}
      `,
    });
    
    return response.text;
  }
}



