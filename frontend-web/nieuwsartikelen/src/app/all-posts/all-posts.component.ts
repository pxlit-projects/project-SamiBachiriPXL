import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [
    NavigationBarComponent,
    DatePipe,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  filteredposts: any = [];
  posts: any = [];
  role: string = localStorage.getItem('role') || '';
  selectedField: string = 'content';
  filterValue: string = '';

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  onFilterTypeChange() {
    this.filterValue = '';
    this.filteredposts = this.posts;
  }

  filter(field: string, value: string) {
    if (!value) {
      this.filteredposts = this.posts;
      return;
    }

    this.filteredposts = this.posts.filter((post: any) => {
      if (field === 'creationDate') {
        const postDate = post.date.split('T')[0];
        return postDate === value;
      }
      return post[field]?.toLowerCase().includes(value.toLowerCase());
    });
  }

  navigateToEditPost(postId: number) {
    this.router.navigate(['/editPost', postId]);
  }

  navigateToReviewPost(postId: number) {
    this.router.navigate(['/review', postId]);
  }
}
