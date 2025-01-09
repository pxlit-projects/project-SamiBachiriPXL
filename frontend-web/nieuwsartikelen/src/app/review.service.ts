import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReviewRequest} from './models/reviewRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  http: HttpClient = inject(HttpClient);
  url = 'http://localhost:8080/api/review/';

  constructor() { }

  createReview(reviewRequest: ReviewRequest, postId: string) {
    const headers = { 'role': localStorage.getItem('role') ?? 'gebruiker' };
    return this.http.post(this.url + postId, reviewRequest, { headers });
  }
}
