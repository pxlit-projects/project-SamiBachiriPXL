import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { PostRequest } from '../models/postRequest.model';
import { PostService } from '../post.service';
import { CommentService } from '../comment.service';
import { CommentRequest } from '../models/commentRequest.model';
import {Post} from '../models/post.model';
import {Comment} from '../models/comment.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    NavigationBarComponent
  ],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  comments: Comment[] = [];
  postId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchPost();
  }

  fetchPost(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId !== null) {
      this.postService.getPost(this.postId).subscribe({
        next: (data: Post) => {
          this.post = data;
          this.fetchComments();
        },
        error: (error: any) => {
          console.error('Error fetching post:', error);
        }
      });
    }
  }

  fetchComments(): void {
    if (this.postId !== null) {
      this.commentService.getCommentsByPostId(Number(this.postId)).subscribe({
        next: (data) => {
          this.comments = data;
        },
        error: (error: any) => {
          console.error('Error fetching comments:', error);
        }
      });
    }
  }

  navigateToAddComment() {
    const postId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/comment', postId]);
  }

  editComment(commentId: number) {
    this.router.navigate(['/edit-comment', commentId]);
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe({
      next: () => {
        this.fetchComments();
      },
      error: (error: any) => {
        console.error('Error deleting comment:', error);
      }
    });
  }
}
