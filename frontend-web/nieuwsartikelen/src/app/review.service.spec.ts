import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReviewService } from './review.service';
import { environment } from '../environments/environment.development';
import { ReviewRequest } from './models/reviewRequest.model';

describe('ReviewService', () => {
  let service: ReviewService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReviewService]
    });
    service = TestBed.inject(ReviewService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a review', () => {
    const reviewRequest: ReviewRequest = { content: 'Test review', editor: 'goofy', approved: true };
    const postId = '1';

    service.createReview(reviewRequest, postId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrlReview}${postId}`);
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('should get notifications by post ID', () => {
    const postId = '1';
    const mockNotifications = [{ id: 1, content: 'Test notification' }];

    service.getNotifications(postId).subscribe(notifications => {
      expect(notifications).toEqual(mockNotifications);
    });

    const req = httpMock.expectOne(`${environment.apiUrlReview}notifications/${postId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockNotifications);
  });

  it('should delete a notification', () => {
    const notificationId = '1';

    service.deleteNotification(notificationId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrlReview}notifications/${notificationId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });
});
