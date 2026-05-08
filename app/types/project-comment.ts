export interface IProjectComment {
  id: number;
  projectId: string;
  content: string;
  createdAt: string;
  createdBy: string;
  author: {
    avatar: string;
  };
}
