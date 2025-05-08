import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../helpers/api-error';
import { userRepository } from '../repositories/userRepository';
import jwt from 'jsonwebtoken';

type JwtPayload = {
  id: number
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    throw new UnauthorizedError('Não autorizado!');
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new UnauthorizedError('Não autorizado!');
    }

    const { password: _, ...loggedUser } = user;

    req.user = loggedUser;

    next();
  } catch {
    throw new UnauthorizedError('Token inválido!');
  }
};
