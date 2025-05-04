import { Router } from "express";
import { ReposController } from "../controllers/repo/ReposController";
import { RepoPathController } from "../controllers/repo/RepoPathController";
import { UserController } from "../controllers/user/UserController";
import { LoginController } from "../controllers/user/LoginController";
import { authMiddleware } from "../middlewares/auth";
import { ChatController } from "../controllers/ai/ChatController";
import { ConversationController } from "../controllers/ai/ConversationController";

const routes = Router();

routes.post('/user/register', new UserController().create);
routes.post('/user/login', new LoginController().login);
routes.get('/user/profile', authMiddleware, new LoginController().getProfile);
routes.put('/user/update/:id', authMiddleware, new UserController().update);
routes.delete('/user/delete', authMiddleware, new UserController().delete);

routes.get('/github/:username/repos', new ReposController().get)
routes.get('/github/:username/:repo/contents', new RepoPathController().get);
routes.post("/chat/:conversationId", authMiddleware, new ChatController().handleChat);

routes.post('/conversation', authMiddleware, new ConversationController().create)
routes.get('/conversationsUser', authMiddleware, new ConversationController().listByUser)

export default routes;