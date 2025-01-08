import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from './models/post.model';
import {PostRequest} from './models/postRequest.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  http: HttpClient = inject(HttpClient);
  url = 'http://localhost:8080/api/post/';

  constructor() {}


  getPosts(){
    const headers = { 'role': localStorage.getItem('role') ?? 'gebruiker' };
    return this.http.get<Post[]>(this.url, { headers });
  }

  getPublisedPosts(){
      return this.http.get(this.url + 'published');
  }

  createPost(postRequest: PostRequest) {
    const headers = { 'role': localStorage.getItem('role') ?? 'gebruiker' };
    return this.http.post(this.url, postRequest, { headers });
  }

  updatePost(post: Post) {
    const headers = { 'role': localStorage.getItem('role') ?? 'gebruiker' };
    return this.http.put(this.url + '/' + post.id, post, { headers });
  }
}
