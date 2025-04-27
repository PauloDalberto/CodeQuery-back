import { LoginUserDTO } from '../../dtos/LoginUserDTO';
import { BadRequestError } from '../../helpers/api-error';
import { userRepository } from '../../repositories/userRepository';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class LoginService {
  async login({ email, password }: LoginUserDTO){

    const user = await userRepository.findOneBy({ email });
    
    if (!user) {
      throw new BadRequestError('E-mail ou senha inválidos!');
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword){
      throw new BadRequestError('E-mail ou senha inválidos!');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '1d' })
  
    const { password: _, ...userLogin } = user;

    return {
      user: userLogin,
      token
    }
  }
}