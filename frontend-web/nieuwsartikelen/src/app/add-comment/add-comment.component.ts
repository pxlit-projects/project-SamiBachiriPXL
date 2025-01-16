import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { CommentRequest } from '../models/commentRequest.model';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavigationBarComponent
  ],
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  commentForm!: FormGroup;

  constructor(
    private commentService: CommentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl('')
    });
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      const postId = this.route.snapshot.paramMap.get('id') || '';
      const commentRequest: CommentRequest = {
        author: localStorage.getItem('username') || '',
        comment: this.commentForm.value.comment,
      };
      this.commentService.addComment(commentRequest, postId).subscribe({
        next: () => {
          this.router.navigate(['/post-detail', postId]);
        },
        error: (error: any) => {
          console.error('Error adding comment:', error);
        }
      });
    }
  }
}
