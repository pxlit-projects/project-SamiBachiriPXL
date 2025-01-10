import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AddCommentComponent } from './add-comment.component';
import { CommentService } from '../comment.service';
import { CommentRequest } from '../models/commentRequest.model';

describe('AddCommentComponent', () => {
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;
  let commentService: jasmine.SpyObj<CommentService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const commentServiceSpy = jasmine.createSpyObj('CommentService', ['addComment']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = {
      snapshot: { paramMap: { get: (key: string) => '1' } }
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, AddCommentComponent],
      providers: [
        { provide: CommentService, useValue: commentServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCommentComponent);
    commentService = TestBed.inject(CommentService) as jasmine.SpyObj<CommentService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add comment on submit', () => {
    component.comment = 'Test Comment';
    const mockCommentRequest: CommentRequest = {
      author: 'testuser',
      comment: 'Test Comment'
    };
    commentService.addComment.and.returnValue(of({}));
    spyOn(localStorage, 'getItem').and.returnValue('testuser');

    component.onSubmit();

    expect(commentService.addComment).toHaveBeenCalledWith(mockCommentRequest, '1');
    expect(router.navigate).toHaveBeenCalledWith(['/post-detail', '1']);
  });

  it('should handle error when adding comment', () => {
    component.comment = 'Test Comment';
    commentService.addComment.and.returnValue(throwError('Error adding comment'));
    spyOn(console, 'error');
    spyOn(localStorage, 'getItem').and.returnValue('testuser');

    component.onSubmit();

    expect(commentService.addComment).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error adding comment:', 'Error adding comment');
  });
});
