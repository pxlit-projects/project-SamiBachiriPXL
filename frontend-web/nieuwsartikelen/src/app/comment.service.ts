import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReviewRequest} from './models/reviewRequest.model';
import {CommentRequest} from './models/commentRequest.model';
import {Comment} from './models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  http: HttpClient = inject(HttpClient);
  url = 'http://localhost:8080/api/comment/';

  constructor() { }

  addComment(commentRequest: CommentRequest, postId: string) {
    const headers = { 'role': localStorage.getItem('role') ?? 'gebruiker' };
    return this.http.post(this.url + postId, commentRequest, { headers });
  }

  getCommentsByPostId(postId: number) {
    const headers = { 'role': localStorage.getItem('role') ?? 'gebruiker' };
    return this.http.get<Comment[]>(this.url + "allcomments/" + postId, { headers });
  }

  updateComment(commentRequest: CommentRequest, postId: string) {
    const headers = { 'role': localStorage.getItem('role') ?? 'gebruiker' };
    return this.http.put(this.url + postId, commentRequest, { headers });
  }

  deleteComment(commentId: number) {
    const headers = { 'role': localStorage.getItem('role') ?? 'gebruiker' };
    return this.http.delete(this.url + commentId, { headers });
  }

  getCommentById(commentId: string) {
    const headers = { 'role': localStorage.getItem('role') ?? 'gebruiker' };
    return this.http.get<Comment>(this.url + commentId, { headers });
  }
}
