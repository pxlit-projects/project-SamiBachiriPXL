import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PostService } from '../post.service';
import { Router, RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-published-posts',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationBarComponent,
    DatePipe,
    FormsModule // Include FormsModule for two-way binding
  ],
  templateUrl: './published-posts.component.html',
  styleUrls: ['./published-posts.component.css']
})
export class PublishedPostsComponent implements OnInit {
  posts: any = [];
  filteredPosts: any = [];
  selectedField: string = 'content';
  filterValue: string = '';

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.postService.getPublishedPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.filteredPosts = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  onFilterTypeChange() {
    this.filterValue = '';
    this.filteredPosts = this.posts;
  }

  filter(field: string, value: string) {
    if (!value) {
      this.filteredPosts = this.posts;
      return;
    }

    this.filteredPosts = this.posts.filter((post: any) => {
      if (field === 'creationDate') {
        const postDate = post.date.split('T')[0];
        return postDate === value;
      }
      return post[field]?.toLowerCase().includes(value.toLowerCase());
    });
  }

  navigateToPostDetail(postId: number) {
    this.router.navigate(['/post-detail', postId]);
  }
}
