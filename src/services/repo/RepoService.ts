import axios from "axios";
import { BadRequestError } from "../../helpers/api-error";

export class RepoService {
  async getProfile({ username }: RepoDTO){
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);

    if(!response){
      throw new BadRequestError("Ocorreu um erro!");
    }

    return response.data;
  }
}