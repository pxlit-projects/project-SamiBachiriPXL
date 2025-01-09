export interface Post{
  id: number;
  title: string;
  content: string;
  author: string;
  creationDate: Date;
  isConcept:boolean;
  reviewStatus: string;
  reviewComment: string;
}
