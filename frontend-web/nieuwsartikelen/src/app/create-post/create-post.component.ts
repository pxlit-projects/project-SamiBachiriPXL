import { Component } from '@angular/core';
import {PostService} from '../post.service';
import {FormsModule} from '@angular/forms';
import {PostRequest} from '../models/postRequest.model';
import {Router} from '@angular/router';
import {NavigationBarComponent} from '../navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    FormsModule,
    NavigationBarComponent
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  title: string= '';
  content: string = '';
  concept: boolean = false;
  showError: boolean = false;

  constructor(private postService: PostService, private router: Router) {}

  onCreate(){
    if (this.title === '' || this.content === ''){
      this.showError = true;
      return;
    }
    const postRequest: PostRequest = {
      title: this.title,
      content: this.content,
      author: localStorage.getItem('username') ?? 'Unknown',
      isConcept: this.concept
    };

    this.postService.createPost(postRequest).subscribe({
      next: () => {
        this.router.navigate(['/allPosts']);
      },
      error: (err) => {
        console.error('Error adding project-list:', err);
      }
    });
  }
}
