import { Request, Response } from 'express'
import { UserService } from '../../services/user/UserService';
import { UnauthorizedError } from '../../helpers/api-error';

export class UserController {
	async create(req: Request, res: Response) {
		const { name, email, password } = req.body;

		const userService = new UserService();

		const user = await userService.create({ email, name, password });

		const { password: _, ...userWithoutPassword } = user;

		res.json(userWithoutPassword);
	}

	async update(req: Request, res: Response) {
		const { name, email, password } = req.body;
		const userId = parseInt(req.params.id, 10);
		const userToken = req.user.id;

		if(userId !== userToken){
			throw new UnauthorizedError("Voce não tem permissao para alterar esse perfil")
		}

		const userService = new UserService();

		const user = await userService.uptade(userId, { email, name, password });

		const { password: _, ...updatedUser } = user;

		res.json(updatedUser);
	}

	async delete(req: Request, res: Response){
		const userId = req.user.id;

		if (!userId) {
			throw new UnauthorizedError("Usuário não autenticado");
		}

		const userService = new UserService();

		const user = await userService.delete(userId);

		res.json({ message: "Usuário deletado com sucesso!" })
	}
}