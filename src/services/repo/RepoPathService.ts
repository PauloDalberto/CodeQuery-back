import axios from 'axios';
import 'dotenv/config';

interface FetchRepoContentsParams {
  username: string;
  repo: string;
  path?: string;
}

const token = process.env.GITHUB_TOKEN;

export async function repoPathService({ username, repo, path = '' }: FetchRepoContentsParams) {
  try {
    const headers = {
      Authorization: `token ${token}`,
    };

    const safePath = path.startsWith('/') ? path.slice(1) : path;

    const response = await axios.get(
      `https://api.github.com/repos/${username}/${repo}/contents/${safePath}`,
      { headers }
    );

    for (const item of response.data) {
      if (item.type === 'dir') {
        console.log(`Entrando na pasta: ${item.path}`);
        await repoPathService({ username, repo, path: item.path });
      } else if (item.type === 'file') {
        const fileContent = await axios.get(item.download_url, { headers });
        console.log(`Conteúdo do arquivo ${item.path}:`, fileContent.data);
      }
    }
  } catch (error) {
    console.error('Erro ao buscar conteúdo do repositório:', error);
    throw new Error('Erro ao buscar conteúdo dos arquivos!');
  }
}
