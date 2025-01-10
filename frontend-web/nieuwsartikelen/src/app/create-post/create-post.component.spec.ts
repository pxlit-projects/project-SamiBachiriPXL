import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePostComponent } from './create-post.component';
import { PostService } from '../post.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { PostRequest } from '../models/postRequest.model';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;
  let postService: PostService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [CreatePostComponent],
      providers: [PostService]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
    router = TestBed.inject(Router);

    // Mock the PostService to simulate a successful post creation
    spyOn(postService, 'createPost').and.returnValue(of({
      title: 'Test Post',
      content: 'This is the content of the post',
      author: localStorage.getItem('username') ?? 'Unknown',
      isConcept: true
    }));

    // Mock router navigate method to test navigation
    spyOn(router, 'navigate');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit the form if title or content is empty', () => {
    component.title = ''; // Empty title
    component.content = ''; // Empty content
    component.onCreate();

    // The error message should be displayed if either title or content is empty
    expect(component.showError).toBeTrue();
  });

  it('should submit the form if title and content are provided', () => {
    component.title = 'Test Post';
    component.content = 'This is the content of the post';
    component.concept = true; // Optional field (checkbox)
    component.onCreate();

    // Ensure the createPost method of the service was called with the correct parameters
    expect(postService.createPost).toHaveBeenCalledWith({
      title: 'Test Post',
      content: 'This is the content of the post',
      author: localStorage.getItem('username') ?? 'Unknown',
      isConcept: true
    });

    // Ensure navigation to 'allPosts' after successful submission
    expect(router.navigate).toHaveBeenCalledWith(['/allPosts']);
  });

  it('should display error if fields are not filled', () => {
    component.title = ''; // Title is empty
    component.content = 'Valid content';
    component.onCreate();

    // Error message should be shown when title is empty
    expect(component.showError).toBeTrue();
  });

  it('should not display error when all fields are filled', () => {
    component.title = 'Valid Title';
    component.content = 'Valid content';
    component.concept = false;
    component.onCreate();

    // Error message should not be displayed
    expect(component.showError).toBeFalse();
  });
});
