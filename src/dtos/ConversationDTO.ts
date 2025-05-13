export interface CreateConversationDTO {
  title: string;
  userId: number;
}

export interface UpdateConversationDTO {
  uuid: string;
  repository: string;
  username: string;
}
