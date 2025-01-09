import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReviewRequest} from './models/reviewRequest.model';
import {environment} from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  http: HttpClient = inject(HttpClient);
  url = environment.apiUrlReview;

  constructor() { }

  createReview(reviewRequest: ReviewRequest, postId: string) {
    const headers = { 'role': localStorage.getItem('role') ?? 'gebruiker' };
    return this.http.post(this.url + postId, reviewRequest, { headers });
  }

  getNotifications(postId: string) {
    const headers = { 'role': localStorage.getItem('role') ?? 'gebruiker' };
    return this.http.get(this.url + `notifications/${postId}`, { headers });
  }

  deleteNotification(id: string) {
    const headers = { 'role': localStorage.getItem('role') ?? 'gebruiker' };
    return this.http.delete(this.url + `notifications/${id}`, { headers });
  }
}
