import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AllPostsComponent } from './all-posts.component';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Post } from '../models/post.model';

describe('AllPostsComponent', () => {
  let component: AllPostsComponent;
  let fixture: ComponentFixture<AllPostsComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getPosts']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, DatePipe, AllPostsComponent],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AllPostsComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch posts on init', () => {
    const mockPosts: Post[] = [{
      id: 1,
      title: 'Test Post',
      content: 'Test Content',
      author: 'Test Author',
      creationDate: new Date('2023-01-01'),
      isConcept: false,
      reviewStatus: 'approved',
      reviewComment: 'Looks good'
    }];
    postService.getPosts.and.returnValue(of(mockPosts));

    component.ngOnInit();

    expect(postService.getPosts).toHaveBeenCalled();
    expect(component.posts).toEqual(mockPosts);
  });

  it('should handle error when fetching posts', () => {
    postService.getPosts.and.returnValue(throwError('Error fetching posts'));

    component.ngOnInit();

    expect(postService.getPosts).toHaveBeenCalled();
    expect(component.posts).toEqual([]);
  });

  it('should filter posts by content', () => {
    component.posts = [
      { id: 1, title: 'Test Post', content: 'Test Content', author: 'Test Author', creationDate: new Date('2023-01-01'), isConcept: false, reviewStatus: 'approved', reviewComment: 'Looks good' },
      { id: 2, title: 'Another Post', content: 'Another Content', author: 'Another Author', creationDate: new Date('2023-01-02'), isConcept: false, reviewStatus: 'approved', reviewComment: 'Looks good' }
    ];
    component.filter('content', 'Test');

    expect(component.filteredposts).toEqual([{ id: 1, title: 'Test Post', content: 'Test Content', author: 'Test Author', creationDate: new Date('2023-01-01'), isConcept: false, reviewStatus: 'approved', reviewComment: 'Looks good' }]);
  });

  it('should filter posts by creationDate', () => {
    component.posts = [
      { id: 1, title: 'Test Post', content: 'Test Content', author: 'Test Author', creationDate: new Date('2023-01-01'), isConcept: false, reviewStatus: 'approved', reviewComment: 'Looks good' },
      { id: 2, title: 'Another Post', content: 'Another Content', author: 'Another Author', creationDate: new Date('2023-01-02'), isConcept: false, reviewStatus: 'approved', reviewComment: 'Looks good' }
    ];
    component.filter('creationDate', '2023-01-01');

    expect(component.filteredposts).toEqual([{ id: 1, title: 'Test Post', content: 'Test Content', author: 'Test Author', creationDate: new Date('2023-01-01'), isConcept: false, reviewStatus: 'approved', reviewComment: 'Looks good' }]);
  });

  it('should navigate to edit post', () => {
    component.navigateToEditPost(1);

    expect(router.navigate).toHaveBeenCalledWith(['/editPost', 1]);
  });

  it('should navigate to review post', () => {
    component.navigateToReviewPost(1);

    expect(router.navigate).toHaveBeenCalledWith(['/review', 1]);
  });
});
