import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostRequest } from '../models/postRequest.model';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [
    FormsModule,
    NavigationBarComponent
  ],
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  postId: string = '';
  concept: boolean = false;
  post: PostRequest = {
    title: '',
    content: '',
    author: '',
    isConcept: false
  };

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.fetchPost();
  }

  fetchPost() {
    this.postId = this.route.snapshot.paramMap.get('id') || '';
    this.postService.getPost(this.postId).subscribe({
      next: (data: PostRequest) => {
        if (data) {
          this.post = data;
        } else {
          console.error('No data found for the given post ID');
        }
      },
      error: (error) => {
        console.error('Error fetching post:', error);
      }
    });
  }

  onSubmit() {
    this.postService.updatePost(this.post, this.postId).subscribe({
      next: (data) => {
        this.router.navigate(['/allPosts']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
