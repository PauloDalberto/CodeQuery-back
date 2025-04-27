import 'express-async-errors';
import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes/routes";
import { errorMiddleware } from './middlewares/error';
import cors from 'cors';

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json())

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  
  app.use(routes)

  app.use(errorMiddleware);
  return app.listen(1234, () => {
    console.log(`Servidor rodando na porta ${1234}`);
  });
})


