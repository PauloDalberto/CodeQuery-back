import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { UpdateUserDTO } from "../../dtos/UptadeUserDTO";
import { User } from "../../entities/User";
import { BadRequestError, NotFoundError } from "../../helpers/api-error";
import { userRepository } from "../../repositories/userRepository";
import bcrypt from 'bcrypt';

export class UserService{
  async create({ name, email, password }: CreateUserDTO): Promise<User>{
    const userExists = await userRepository.findOneBy({ email });

    if (userExists) {
      throw new BadRequestError('E-mail já existe');
    }

    const hashPassword = await bcrypt.hash(password, 10)
    
    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
    })

    await userRepository.save(user)

    return user;
  }

  async uptade(userId: number, { name, email, password }: UpdateUserDTO){    
    const user = await userRepository.findOneBy({ id: userId });

    if(!user){
      throw new BadRequestError("Usuário nao encontrado!");
    }

    if(name){
      user.name = name;
    }

    if(email){
      const useEmail = await userRepository.findOneBy({ email });
      if(useEmail && useEmail.id !== user.id){
        throw new BadRequestError("Este email já está em uso");
      }
      user.email = email;
    }

    if(password){
      const hashPassword = await bcrypt.hash(password, 10)
      user.password = hashPassword;
    }

    await userRepository.save(user);
    
    return user;
  }

  async delete(userId: number){
    const user = await userRepository.findOneBy({ id: userId });
    
    if(!user){
      throw new NotFoundError("Usuário não encontrado");
    }

    await userRepository.softDelete(userId);
  }
}