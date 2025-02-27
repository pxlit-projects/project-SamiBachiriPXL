import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PublishedPostsComponent } from './published-posts.component';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post.model';
import {HttpTestingController} from '@angular/common/http/testing';

describe('PublishedPostsComponent', () => {
  let component: PublishedPostsComponent;
  let fixture: ComponentFixture<PublishedPostsComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;
  let httpTestingController : HttpTestingController;

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getPublisedPosts']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = {
      snapshot: { paramMap: { get: (key: string) => '1' } }
    };

    await TestBed.configureTestingModule({
      imports: [PublishedPostsComponent],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PublishedPostsComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    httpTestingController = TestBed.inject(HttpTestingController);
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch published posts on init', () => {
    const mockPosts: Post[] = [{
      id: 1,
      title: 'Test Post',
      content: 'Test Content',
      author: 'Test Author',
      date: new Date('2023-10-01'),
      isConcept: false,
      reviewStatus: 'approved',
      reviewComment: 'Looks good'
    }];
    postService.getPublishedPosts.and.returnValue(of(mockPosts));

    component.ngOnInit();

    expect(postService.getPublishedPosts).toHaveBeenCalled();
    expect(component.posts).toEqual(mockPosts);
    expect(component.filteredPosts).toEqual(mockPosts);
  });

  it('should handle error when fetching published posts', () => {
    postService.getPublishedPosts.and.returnValue(throwError('Error fetching posts'));
    spyOn(console, 'error');

    component.ngOnInit();

    expect(postService.getPublishedPosts).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('There was an error!', 'Error fetching posts');
  });

  it('should filter posts by content', () => {
    component.posts = [
      { id: 1, title: 'Test Post 1', content: 'Test Content 1', author: 'Author 1', creationDate: new Date('2023-10-01'), isConcept: false, reviewStatus: 'approved', reviewComment: 'Looks good' },
      { id: 2, title: 'Another Post', content: 'Another Content', author: 'Author 2', creationDate: new Date('2023-10-02'), isConcept: false, reviewStatus: 'approved', reviewComment: 'Looks good' }
    ];
    component.filter('content', 'Test');

    const req = httpTestingController.expectOne('http://localhost:3000/posts?content=Test');
    req.flush({ id: 1, title: 'Test Post 1', content: 'Test Content 1', author: 'Author 1', creationDate: new Date('2023-10-01'), isConcept: false, reviewStatus: 'approved', reviewComment: 'Looks good' });
  });

  it('should filter posts by creation date', () => {
    component.posts = [
      { id: 1, title: 'Test Post 1', content: 'Test Content 1', author: 'Author 1', creationDate: new Date('2023-10-01'), isConcept: false, reviewStatus: 'approved', reviewComment: 'Looks good' },
      { id: 2, title: 'Another Post', content: 'Another Content', author: 'Author 2', creationDate: new Date('2023-10-02'), isConcept: false, reviewStatus: 'approved', reviewComment: 'Looks good' }
    ];
    component.filter('creationDate', '2023-10-01');

    expect(component.filteredPosts).toEqual([{ id: 1, title: 'Test Post 1', content: 'Test Content 1', author: 'Author 1', creationDate: new Date('2023-10-01'), isConcept: false, reviewStatus: 'approved', reviewComment: 'Looks good' }]);
  });

  it('should navigate to post detail', () => {
    component.navigateToPostDetail(1);

    expect(router.navigate).toHaveBeenCalledWith(['/post-detail', 1]);
  });
});
