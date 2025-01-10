import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentService } from './comment.service';
import { environment } from '../environments/environment.development';
import { CommentRequest } from './models/commentRequest.model';
import { Comment } from './models/comment.model';

describe('CommentService', () => {
  let service: CommentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService]
    });
    service = TestBed.inject(CommentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a comment', () => {
    const commentRequest: CommentRequest = { comment: 'Test comment', author: 'goofy' };
    const postId = '1';

    service.addComment(commentRequest, postId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrlComment}${postId}`);
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('should get comments by post ID', () => {
    const postId = 1;
    const mockComments: Comment[] = [{ id: 1, comment: 'Test comment', author: 'goofy', postId: 1 }];

    service.getCommentsByPostId(postId).subscribe(comments => {
      expect(comments.length).toBe(1);
      expect(comments).toEqual(mockComments);
    });

    const req = httpMock.expectOne(`${environment.apiUrlComment}allcomments/${postId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });

  it('should update a comment', () => {
    const commentRequest: CommentRequest = { comment: 'Test comment', author: 'goofy' };
    const postId = '1';

    service.updateComment(commentRequest, postId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrlComment}${postId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({ success: true });
  });

  it('should delete a comment', () => {
    const commentId = 1;

    service.deleteComment(commentId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrlComment}${commentId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });

  it('should get a comment by ID', () => {
    const commentId = '1';
    const mockComment: Comment = { id: 1, comment: 'Test comment', author: 'goofy', postId: 1 };

    service.getCommentById(commentId).subscribe(comment => {
      expect(comment).toEqual(mockComment);
    });

    const req = httpMock.expectOne(`${environment.apiUrlComment}${commentId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComment);
  });
});
