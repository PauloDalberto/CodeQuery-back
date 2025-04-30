import axios from 'axios';
import { BadRequestError } from '../../helpers/api-error';
import 'dotenv';

export async function repoPathService({
  username,
  repo,
  path = 'src',
  filesContent = {}
}: FetchRepoContentsParamsDTO): Promise<{ [key: string]: string }> {
  const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response) {
    throw new BadRequestError('Erro ao buscar conteúdo dos arquivos!');
  }

  try {
    for (const item of response.data) {
      if (item.type === 'dir') {
        console.log(`Entrando na pasta: ${item.path}`);
        await repoPathService({ username, repo, path: item.path, filesContent });
      } else if (item.type === 'file') {
        const fileContent = await axios.get(item.download_url);
        console.log(`Lendo arquivo: ${item.path}`);
        filesContent[item.path] = fileContent.data;
      }
    }
  } catch (error) {
    console.error(error);
    throw new BadRequestError('Erro ao buscar conteúdo dos arquivos!');
  }

  return filesContent;
}
