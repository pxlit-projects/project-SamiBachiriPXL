import {Component, OnInit} from '@angular/core';
import {PostService} from '../post.service';
import {NavigationBarComponent} from '../navigation-bar/navigation-bar.component';

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
  constructor(private postService: PostService) {}

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
}
