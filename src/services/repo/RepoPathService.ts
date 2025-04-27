import axios from 'axios';
import { BadRequestError } from '../../helpers/api-error';

interface FetchRepoContentsParams {
  username: string;
  repo: string;
  path?: string;
}

export async function repoPathService({ username, repo, path = 'src' }: FetchRepoContentsParams) {
  const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/contents/${path}`);

  try {
    for (const item of response.data) {
      if (item.type === 'dir') {
  
        console.log(`Entrando na pasta: ${item.path}`);
        await repoPathService({ username, repo, path: item.path });
      } else if (item.type === 'file') {
  
        const fileContent = await axios.get(item.download_url);
        console.log(`Conteúdo do arquivo ${item.path}:`, fileContent.data);
      }
    }  
  } catch (error) {
    console.log(error)
  }
}
