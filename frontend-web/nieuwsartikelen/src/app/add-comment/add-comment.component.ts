import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { CommentRequest } from '../models/commentRequest.model';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavigationBarComponent,
    FormsModule
  ],
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  comment: string = '';

  constructor(
    private commentService: CommentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const postId = this.route.snapshot.paramMap.get('id') || '';
    const commentRequest: CommentRequest = {
      author: localStorage.getItem('username') || '',
      comment: this.comment,
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
