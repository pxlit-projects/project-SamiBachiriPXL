import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../review.service';
import { ReviewRequest } from '../models/reviewRequest.model';
import {NavigationBarComponent} from '../navigation-bar/navigation-bar.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [FormsModule, NavigationBarComponent],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  content: string = '';

  editor: string = localStorage.getItem('username') || '';

  constructor(private reviewService: ReviewService,
              private router: Router,
              private route: ActivatedRoute) {}

  createReview(approved: boolean) {
    const postId: string = this.route.snapshot.paramMap.get('id') || '';
    console.log('Post ID:', postId);
    const reviewRequest: ReviewRequest = {
      content: this.content,
      editor: this.editor,
      approved: approved
    };

    this.reviewService.createReview(reviewRequest, postId).subscribe({
      next: () => {
        this.router.navigate(['/allPosts']);
      },
      error: (error) => {
        console.error('Error submitting review', error);
      }
    });
  }
}
