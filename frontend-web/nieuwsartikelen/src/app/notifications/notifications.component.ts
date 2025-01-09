import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { PostService } from '../post.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    NavigationBarComponent
  ],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  posts: any[] = [];

  constructor(private reviewService: ReviewService, private postService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    const author = localStorage.getItem('username') ?? 'Anonymous';
    this.postService.getPostsByAuthor(author).subscribe({
      next: (data: any) => {
        this.posts = data;
        this.fetchAllNotifications();
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    });
  }

  fetchAllNotifications() {
    this.posts.forEach(post => {
      this.fetchNotifications(post.id);
    });
  }

  fetchNotifications(postId: string) {
    this.reviewService.getNotifications(postId).subscribe({
      next: (data: any) => {
        this.notifications = [...this.notifications, ...data];
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    });
  }

  deleteNotification(notificationId: string) {
    this.reviewService.deleteNotification(notificationId).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(notification => notification.id !== notificationId);
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    });
  }

  trackByNotificationId(index: number, notification: any): string {
    return notification.id;
  }
}
