import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CreatePostComponent } from './create-post.component';
import { PostService } from '../post.service';
import { PostRequest } from '../models/postRequest.model';
import { ActivatedRoute } from '@angular/router';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['createPost']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = {
      snapshot: { paramMap: { get: (key: string) => '1' } }
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, CreatePostComponent],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if title or content is empty', () => {
    component.title = '';
    component.content = '';
    component.onCreate();
    expect(component.showError).toBeTrue();

    component.title = 'Test Title';
    component.content = '';
    component.onCreate();
    expect(component.showError).toBeTrue();

    component.title = '';
    component.content = 'Test Content';
    component.onCreate();
    expect(component.showError).toBeTrue();
  });

  it('should create post and navigate to allPosts on success', () => {
    component.title = 'Test Title';
    component.content = 'Test Content';
    const mockPostRequest: PostRequest = {
      title: 'Test Title',
      content: 'Test Content',
      author: 'Unknown',
      isConcept: false
    };
    postService.createPost.and.returnValue(of({}));

    component.onCreate();

    expect(postService.createPost).toHaveBeenCalledWith(mockPostRequest);
    expect(router.navigate).toHaveBeenCalledWith(['/allPosts']);
  });

  it('should handle error when creating post', () => {
    component.title = 'Test Title';
    component.content = 'Test Content';
    postService.createPost.and.returnValue(throwError('Error creating post'));
    spyOn(console, 'error');

    component.onCreate();

    expect(postService.createPost).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error adding project-list:', 'Error creating post');
  });
});
