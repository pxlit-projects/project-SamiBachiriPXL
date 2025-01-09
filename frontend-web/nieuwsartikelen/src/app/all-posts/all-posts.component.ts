import {Component, OnInit} from '@angular/core';
import {PostService} from '../post.service';
import {NavigationBarComponent} from '../navigation-bar/navigation-bar.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [
    NavigationBarComponent
  ],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css'
})
export class AllPostsComponent implements OnInit{
  posts: any = [];
  role: string = localStorage.getItem('role') || '';
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts(){
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    })
  }

  navigateToEditPost(postId: number) {
    this.router.navigate(['/editPost', postId]);
  }

  navigateToReviewPost(postId: number) {
    this.router.navigate(['/review', postId]);
  }
}
