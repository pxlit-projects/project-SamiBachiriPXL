export interface Post{
  id: number;
  title: string;
  content: string;
  author: string;
  date: Date;
  isConcept:boolean;
  reviewStatus: string;
  reviewComment: string;
}
