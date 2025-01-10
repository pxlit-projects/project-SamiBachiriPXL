import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { EditPostComponent } from './edit-post.component';
import { PostService } from '../post.service';
import { Post } from '../models/post.model';

describe('EditPostComponent', () => {
  let component: EditPostComponent;
  let fixture: ComponentFixture<EditPostComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getPost', 'updatePost']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = {
      snapshot: { paramMap: { get: (key: string) => '1' } }
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, EditPostComponent],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPostComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch post on init', () => {
    const mockPost: Post = {
      id: 1,
      title: 'Test Title',
      content: 'Test Content',
      author: 'Test Author',
      creationDate: new Date('2023-01-01'),
      isConcept: false,
      reviewStatus: 'approved',
      reviewComment: 'Looks good'
    };
    postService.getPost.and.returnValue(of(mockPost));

    component.ngOnInit();

    expect(postService.getPost).toHaveBeenCalledWith('1');
    expect(component.post).toEqual(mockPost);
  });

  it('should handle error when fetching post', () => {
    postService.getPost.and.returnValue(throwError('Error fetching post'));

    component.ngOnInit();

    expect(postService.getPost).toHaveBeenCalledWith('1');
    expect(component.post).toEqual({
      title: '',
      content: '',
      author: '',
      isConcept: false
    });
  });

  it('should update post on submit', () => {
    const mockPost: Post = {
      id: 1,
      title: 'Updated Title',
      content: 'Updated Content',
      author: 'Updated Author',
      creationDate: new Date('2023-01-01'),
      isConcept: true,
      reviewStatus: 'approved',
      reviewComment: 'Looks good'
    };
    component.post = mockPost;
    postService.updatePost.and.returnValue(of({}));

    component.onSubmit();

    expect(postService.updatePost).toHaveBeenCalledWith(mockPost, '1');
    expect(router.navigate).toHaveBeenCalledWith(['/allPosts']);
  });

  it('should handle error when updating post', () => {
    const mockPost: Post = {
      id: 1,
      title: 'Updated Title',
      content: 'Updated Content',
      author: 'Updated Author',
      creationDate: new Date('2023-01-01'),
      isConcept: true,
      reviewStatus: 'approved',
      reviewComment: 'Looks good'
    };
    component.post = mockPost;
    postService.updatePost.and.returnValue(throwError('Error updating post'));
    spyOn(console, 'error');

    component.onSubmit();

    expect(postService.updatePost).toHaveBeenCalledWith(mockPost, '1');
    expect(console.error).toHaveBeenCalledWith('Error updating post:', 'Error updating post');
  });
});
