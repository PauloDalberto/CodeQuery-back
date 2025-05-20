import { AppDataSource } from "../data-source";
import { RepositoryData } from "../entities/RepositoryData";

export const repoitoryDataRepository = AppDataSource.getRepository(RepositoryData)