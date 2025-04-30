interface FetchRepoContentsParamsDTO {
  username: string;
  repo: string;
  path?: string;
  filesContent?: { [key: string]: string }; 
}
