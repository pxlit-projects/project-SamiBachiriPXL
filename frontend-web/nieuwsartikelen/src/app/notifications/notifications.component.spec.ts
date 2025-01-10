import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { NotificationsComponent } from './notifications.component';
import { ReviewService } from '../review.service';
import { PostService } from '../post.service';
import { Post } from '../models/post.model';
import { ActivatedRoute } from '@angular/router';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  let reviewService: jasmine.SpyObj<ReviewService>;
  let postService: jasmine.SpyObj<PostService>;

  beforeEach(async () => {
    const reviewServiceSpy = jasmine.createSpyObj('ReviewService', ['getNotifications', 'deleteNotification']);
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getPostsByAuthor']);
    const activatedRouteStub = {
      snapshot: { paramMap: { get: (key: string) => '1' } }
    };

    await TestBed.configureTestingModule({
      imports: [NotificationsComponent],
      providers: [
        { provide: ReviewService, useValue: reviewServiceSpy },
        { provide: PostService, useValue: postServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    reviewService = TestBed.inject(ReviewService) as jasmine.SpyObj<ReviewService>;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;

    // Mock the return values of the service methods
    postService.getPostsByAuthor.and.returnValue(of([]));
    reviewService.getNotifications.and.returnValue(of([]));
    reviewService.deleteNotification.and.returnValue(of({}));

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
      author: 'Author',
      date: new Date('2023-01-01'),
      isConcept: false,
      reviewStatus: 'approved',
      reviewComment: 'Looks good'
    }];
    postService.getPostsByAuthor.and.returnValue(of(mockPosts));

    component.ngOnInit();

    expect(postService.getPostsByAuthor).toHaveBeenCalled();
    expect(component.posts).toEqual(mockPosts);
  });

  it('should handle error when fetching posts', () => {
    postService.getPostsByAuthor.and.returnValue(throwError('Error fetching posts'));

    component.ngOnInit();

    expect(postService.getPostsByAuthor).toHaveBeenCalled();
    expect(component.posts).toEqual([]);
  });

  it('should fetch notifications for each post', () => {
    const mockPosts: Post[] = [{
      id: 1,
      title: 'Test Post',
      content: 'Test Content',
      author: 'Author',
      date: new Date('2023-01-01'),
      isConcept: false,
      reviewStatus: 'approved',
      reviewComment: 'Looks good'
    }];
    const mockNotifications = [{ id: '1', message: 'Test Notification' }];
    postService.getPostsByAuthor.and.returnValue(of(mockPosts));
    reviewService.getNotifications.and.returnValue(of(mockNotifications));

    component.ngOnInit();

    expect(reviewService.getNotifications).toHaveBeenCalledWith('1');
    expect(component.notifications).toEqual(mockNotifications);
  });

  it('should handle error when fetching notifications', () => {
    const mockPosts: Post[] = [{
      id: 1,
      title: 'Test Post',
      content: 'Test Content',
      author: 'Author',
      date: new Date('2023-01-01'),
      isConcept: false,
      reviewStatus: 'approved',
      reviewComment: 'Looks good'
    }];
    postService.getPostsByAuthor.and.returnValue(of(mockPosts));
    reviewService.getNotifications.and.returnValue(throwError('Error fetching notifications'));

    component.ngOnInit();

    expect(reviewService.getNotifications).toHaveBeenCalledWith('1');
    expect(component.notifications).toEqual([]);
  });

  it('should delete notification and update the list', () => {
    const mockNotifications = [{ id: '1', message: 'Test Notification' }];
    component.notifications = mockNotifications;
    reviewService.deleteNotification.and.returnValue(of({}));

    component.deleteNotification('1');

    expect(reviewService.deleteNotification).toHaveBeenCalledWith('1');
    expect(component.notifications).toEqual([]);
  });

  it('should handle error when deleting notification', () => {
    const mockNotifications = [{ id: '1', message: 'Test Notification' }];
    component.notifications = mockNotifications;
    reviewService.deleteNotification.and.returnValue(throwError('Error deleting notification'));
    spyOn(console, 'error');

    component.deleteNotification('1');

    expect(reviewService.deleteNotification).toHaveBeenCalledWith('1');
    expect(console.error).toHaveBeenCalledWith('There was an error!', 'Error deleting notification');
  });
});
