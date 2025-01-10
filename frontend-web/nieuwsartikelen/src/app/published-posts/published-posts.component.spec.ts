import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PublishedPostsComponent } from './published-posts.component';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

describe('PublishedPostsComponent', () => {
  let component: PublishedPostsComponent;
  let fixture: ComponentFixture<PublishedPostsComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

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
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch published posts on init', () => {
    const mockPosts = [{ id: 1, content: 'Test Post', date: '2023-10-01T00:00:00Z' }];
    postService.getPublisedPosts.and.returnValue(of(mockPosts));

    component.ngOnInit();

    expect(postService.getPublisedPosts).toHaveBeenCalled();
    expect(component.posts).toEqual(mockPosts);
    expect(component.filteredPosts).toEqual(mockPosts);
  });

  it('should handle error when fetching published posts', () => {
    postService.getPublisedPosts.and.returnValue(throwError('Error fetching posts'));
    spyOn(console, 'error');

    component.ngOnInit();

    expect(postService.getPublisedPosts).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('There was an error!', 'Error fetching posts');
  });

  it('should filter posts by content', () => {
    component.posts = [
      { id: 1, content: 'Test Post 1', date: '2023-10-01T00:00:00Z' },
      { id: 2, content: 'Another Post', date: '2023-10-02T00:00:00Z' }
    ];
    component.filter('content', 'Test');

    expect(component.filteredPosts).toEqual([{ id: 1, content: 'Test Post 1', date: '2023-10-01T00:00:00Z' }]);
  });

  it('should filter posts by creation date', () => {
    component.posts = [
      { id: 1, content: 'Test Post 1', date: '2023-10-01T00:00:00Z' },
      { id: 2, content: 'Another Post', date: '2023-10-02T00:00:00Z' }
    ];
    component.filter('creationDate', '2023-10-01');

    expect(component.filteredPosts).toEqual([{ id: 1, content: 'Test Post 1', date: '2023-10-01T00:00:00Z' }]);
  });

  it('should navigate to post detail', () => {
    component.navigateToPostDetail(1);

    expect(router.navigate).toHaveBeenCalledWith(['/post-detail', 1]);
  });
});
