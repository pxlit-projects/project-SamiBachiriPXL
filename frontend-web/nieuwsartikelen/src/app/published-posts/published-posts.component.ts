import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {PostService} from '../post.service';
import {RouterOutlet} from '@angular/router';
import {NavigationBarComponent} from '../navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-published-posts',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationBarComponent
  ],
  templateUrl: './published-posts.component.html',
  styleUrl: './published-posts.component.css'
})
export class PublishedPostsComponent implements OnInit {
  posts: any = [];
  filteredPosts: any = [];
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPublisedPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.filteredPosts = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    })
  }

  filter(field: string, value: string) {
    this.filteredPosts = this.posts.filter((post: any) => {
      if (field === 'creationDate') {
        return post.creationDate.startsWith(value);
      }
      return post[field].toLowerCase().includes(value.toLowerCase());
    });
  }
}
