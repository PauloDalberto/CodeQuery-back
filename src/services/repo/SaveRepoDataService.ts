import { repoitoryDataRepository } from "../../repositories/repositoryDataRespository";

export const saveRepoDataService = async ({
  uuid,
  filesContent,
}: {
  uuid: string;
  filesContent: { [key: string]: string };
}) => {
  ;

  const existing = await repoitoryDataRepository.findOne({ where: { conversationUuid: uuid } });

  if (existing) {
    existing.filesContent = JSON.stringify(filesContent);
    await repoitoryDataRepository.save(existing);
    return;
  }

  const repoData = repoitoryDataRepository.create({
    conversationUuid: uuid,
    filesContent: JSON.stringify(filesContent),
  });

  await repoitoryDataRepository.save(repoData);
};
