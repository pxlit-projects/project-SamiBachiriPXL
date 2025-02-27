import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { CommentService } from '../comment.service';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import {Comment} from '../models/comment.model';

@Component({
  selector: 'app-edit-comment',
  standalone: true,
  imports: [
    NavigationBarComponent,
    FormsModule,
  ],
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
  comment: Comment = { id: 0, postId: 0,author: '', comment: '' };

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const commentId = this.route.snapshot.paramMap.get('id') || '';
    if (commentId) {
      this.commentService.getCommentById(commentId).subscribe({
        next: (data: Comment) => {
          this.comment = data;
        },
        error: (error: any) => {
          console.error('Error fetching comment:', error);
        }
      });
    }
  }

  onSubmit(): void {
    const commentId = this.route.snapshot.paramMap.get('id') || '';
    this.commentService.updateComment(this.comment, commentId).subscribe({
      next: () => {
        this.router.navigate(['/post-detail', this.comment.postId]);
      },
      error: (error: any) => {
        console.error('Error updating comment:', error);
      }
    });
  }
}
