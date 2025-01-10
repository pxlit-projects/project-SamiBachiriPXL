import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { EditCommentComponent } from './edit-comment.component';
import { CommentService } from '../comment.service';
import { Comment } from '../models/comment.model';
import {CommentRequest} from '../models/commentRequest.model';

describe('EditCommentComponent', () => {
  let component: EditCommentComponent;
  let fixture: ComponentFixture<EditCommentComponent>;
  let commentService: jasmine.SpyObj<CommentService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const commentServiceSpy = jasmine.createSpyObj('CommentService', ['getCommentById', 'updateComment']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = {
      snapshot: { paramMap: { get: (key: string) => '1' } }
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, EditCommentComponent],
      providers: [
        { provide: CommentService, useValue: commentServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCommentComponent);
    component = fixture.componentInstance;
    commentService = TestBed.inject(CommentService) as jasmine.SpyObj<CommentService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch comment on init', () => {
    const mockComment: Comment = { id: 1, postId: 1, author: 'Author', comment: 'Test Comment' };
    commentService.getCommentById.and.returnValue(of(mockComment));

    component.ngOnInit();

    expect(commentService.getCommentById).toHaveBeenCalledWith('1');
    expect(component.comment).toEqual(mockComment);
  });

  it('should handle error when fetching comment', () => {
    commentService.getCommentById.and.returnValue(throwError('Error fetching comment'));

    component.ngOnInit();

    expect(commentService.getCommentById).toHaveBeenCalledWith('1');
    expect(component.comment).toEqual({ id: 0, postId: 0, author: '', comment: '' });
  });

  it('should update comment on submit', () => {
    const mockComment: Comment = { id: 1, postId: 1, author: 'Author', comment: 'Updated Comment' };
    const mockCommentRequest: CommentRequest = {
      author: mockComment.author,
      comment: mockComment.comment,
    };

    component.comment = mockComment;

    // Simulate the service returning an observable
    commentService.updateComment.and.returnValue(of({}));

    component.onSubmit();

    expect(commentService.updateComment).toHaveBeenCalledWith(mockCommentRequest, '1');
    expect(router.navigate).toHaveBeenCalledWith(['/post-detail', mockComment.postId]);
  });


  it('should handle error when updating comment', () => {
    const mockComment: Comment = { id: 1, postId: 1, author: 'Author', comment: 'Updated Comment' };
    component.comment = mockComment;
    commentService.updateComment.and.returnValue(throwError('Error updating comment'));
    spyOn(console, 'error');

    component.onSubmit();

    expect(commentService.updateComment).toHaveBeenCalledWith(mockComment, '1');
    expect(console.error).toHaveBeenCalledWith('Error updating comment:', 'Error updating comment');
  });
});
