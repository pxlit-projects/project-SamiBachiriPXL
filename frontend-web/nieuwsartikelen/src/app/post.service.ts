import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from './models/post.model';
import {PostRequest} from './models/postRequest.model';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  http: HttpClient = inject(HttpClient);
  url = environment.apiUrlPost;

  constructor() {}


  getPosts(){
    const headers = { 'role': localStorage.getItem('role') ?? 'gebruiker' };
    return this.http.get<Post[]>(this.url, { headers });
  }

  getPost(postId: string){
    const headers = { 'role': localStorage.getItem('role') ?? 'gebruiker' };
    return this.http.get<Post>(this.url + postId, { headers });
  }

  getPublishedPosts(){
      return this.http.get<Post[]>(this.url + 'published');
  }

  createPost(postRequest: PostRequest) {
    const headers = { 'role': localStorage.getItem('role') ?? 'gebruiker' };
    return this.http.post<PostRequest>(this.url, postRequest, { headers });
  }

  updatePost(postRequest: PostRequest, postId: string) {
    const headers = { 'role': localStorage.getItem('role') ?? 'gebruiker' };
    return this.http.post(this.url + postId, postRequest, { headers });
  }

  getPostsByAuthor(author: string){
    const headers = { 'role': localStorage.getItem('role') ?? 'gebruiker' };
    return this.http.get<Post[]>(this.url + `author/${author}`, { headers });
  }
}
