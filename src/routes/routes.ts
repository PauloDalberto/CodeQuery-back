import { Router } from "express";
import { ReposController } from "../controllers/repo/ReposController";
import { RepoContentController } from "../controllers/repo/RepoContentController";
import { RepoPathController } from "../controllers/repo/RepoPathController";
import { UserController } from "../controllers/user/UserController";
import { LoginController } from "../controllers/user/LoginController";
import { authMiddleware } from "../middlewares/auth";
import { ChatController } from "../controllers/ai/ChatController";

const routes = Router();

routes.post('/user/register', new UserController().create);
routes.post('/user/login', new LoginController().login);
routes.get('/user/profile', authMiddleware, new LoginController().getProfile);
routes.put('/user/update/:id', authMiddleware, new UserController().update);
routes.delete('/user/delete', authMiddleware, new UserController().delete);

routes.get('/github/:username/:repo/contents/:path*', new RepoPathController().get);
routes.get('/github/:username/:repo/contents', new RepoContentController().get);
routes.get('/github/:username/repos', new ReposController().get)

routes.post("/chat", new ChatController().handleChat)

export default routes;