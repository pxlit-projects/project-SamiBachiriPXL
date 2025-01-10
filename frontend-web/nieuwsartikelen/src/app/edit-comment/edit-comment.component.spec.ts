import {of, throwError} from 'rxjs';
import {CommentRequest} from '../models/commentRequest.model';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {EditCommentComponent} from './edit-comment.component';
import {CommentService} from '../comment.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Comment} from '../models/comment.model';

describe('EditCommentComponent', () => {
  let component: EditCommentComponent;
  let fixture: ComponentFixture<EditCommentComponent>;
  let commentServiceMock: jasmine.SpyObj<CommentService>;
  let routerMock: jasmine.SpyObj<Router>;
  let activatedRouteMock: any;

  beforeEach(async () => {
    // Mock CommentService and Router
    commentServiceMock = jasmine.createSpyObj('CommentService', ['getCommentById', 'updateComment']);
    routerMock = jasmine.createSpyObj('Router', ['navigate', 'events']);

    // ActivatedRoute mock to return an 'id' param
    activatedRouteMock = {
      snapshot: { paramMap: { get: (key: string) => '1' } }
    };

    // Configure the TestBed
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        EditCommentComponent // Import the standalone component here
      ],
      providers: [
        { provide: CommentService, useValue: commentServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    // Create the component fixture
    fixture = TestBed.createComponent(EditCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch comment on init', () => {
    const mockComment: Comment = { id: 1, postId: 1, author: 'Author', comment: 'Test Comment' };

    // Mock the service method
    commentServiceMock.getCommentById.and.returnValue(of(mockComment));

    component.ngOnInit();

    expect(commentServiceMock.getCommentById).toHaveBeenCalledWith('1');
    expect(component.comment).toEqual(mockComment);
  });

  it('should handle error when fetching comment', () => {
    // Return an error from the service
    commentServiceMock.getCommentById.and.returnValue(throwError('Error fetching comment'));

    component.ngOnInit();

    // Expect the component's comment to be the default empty state
    expect(commentServiceMock.getCommentById).toHaveBeenCalledWith('1');
    expect(component.comment).toEqual({ id: 0, postId: 0, author: '', comment: '' });
  });

  it('should update comment on submit and navigate on success', () => {
    const mockComment: Comment = { id: 1, postId: 1, author: 'Author', comment: 'Updated Comment' };
    const mockCommentRequest: CommentRequest = {
      author: mockComment.author,
      comment: mockComment.comment
    };

    component.comment = mockComment;

    // Mock the service update method to return the mockCommentRequest
    commentServiceMock.updateComment.and.returnValue(of(mockCommentRequest));

    // Call the onSubmit method
    component.onSubmit();

    // Check that the update method was called with the correct parameters
    expect(commentServiceMock.updateComment).toHaveBeenCalledWith(mockCommentRequest, '1');
    // Verify that the router navigate method was called to redirect after update
    expect(routerMock.navigate).toHaveBeenCalledWith(['/post-detail', mockComment.postId]);
  });

  it('should handle error when updating comment', () => {
    const mockComment: Comment = { id: 1, postId: 1, author: 'Author', comment: 'Updated Comment' };
    component.comment = mockComment;

    // Return an error when trying to update
    commentServiceMock.updateComment.and.returnValue(throwError('Error updating comment'));
    spyOn(console, 'error');

    component.onSubmit();

    // Verify that the updateComment method was called
    expect(commentServiceMock.updateComment).toHaveBeenCalledWith(mockComment, '1');
    // Expect the error to be logged to the console
    expect(console.error).toHaveBeenCalledWith('Error updating comment:', 'Error updating comment');
  });
});
