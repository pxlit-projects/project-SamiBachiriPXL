import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PostDetailComponent } from './post-detail.component';
import { PostService } from '../post.service';
import { CommentService } from '../comment.service';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let commentService: jasmine.SpyObj<CommentService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getPost']);
    const commentServiceSpy = jasmine.createSpyObj('CommentService', ['getCommentsByPostId', 'deleteComment']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PostDetailComponent, RouterTestingModule],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: CommentService, useValue: commentServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (key: string) => '1' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    commentService = TestBed.inject(CommentService) as jasmine.SpyObj<CommentService>;
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
      title: 'Test Post',
      content: 'Test Content',
      author: 'Author',
      date: new Date('2023-01-01'),
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
    expect(component.post).toBeUndefined();
  });

  it('should fetch comments for the post', () => {
    const mockComments: Comment[] = [{ id: 1, comment: 'Test Comment', author: 'goofy', postId: 1 }];
    const mockPost: Post = {
      id: 1,
      title: 'Test Post',
      content: 'Test Content',
      author: 'Author',
      date: new Date('2023-01-01'),
      isConcept: false,
      reviewStatus: 'approved',
      reviewComment: 'Looks good'
    };
    postService.getPost.and.returnValue(of(mockPost));
    commentService.getCommentsByPostId.and.returnValue(of(mockComments));

    component.ngOnInit();

    expect(commentService.getCommentsByPostId).toHaveBeenCalledWith(1);
    expect(component.comments).toEqual(mockComments);
  });

  it('should handle error when fetching comments', () => {
    const mockPost: Post = {
      id: 1,
      title: 'Test Post',
      content: 'Test Content',
      author: 'Author',
      date: new Date('2023-01-01'),
      isConcept: false,
      reviewStatus: 'approved',
      reviewComment: 'Looks good'
    };
    postService.getPost.and.returnValue(of(mockPost));
    commentService.getCommentsByPostId.and.returnValue(throwError('Error fetching comments'));

    component.ngOnInit();

    expect(commentService.getCommentsByPostId).toHaveBeenCalledWith(1);
    expect(component.comments).toEqual([]);
  });

  it('should navigate to add comment', () => {
    component.navigateToAddComment();
    expect(router.navigate).toHaveBeenCalledWith(['/comment', '1']);
  });

  it('should navigate to edit comment', () => {
    component.editComment(1);
    expect(router.navigate).toHaveBeenCalledWith(['/edit-comment', 1]);
  });

  it('should delete comment and refresh comments', () => {
    commentService.deleteComment.and.returnValue(of({}));
    spyOn(component, 'fetchComments');

    component.deleteComment(1);

    expect(commentService.deleteComment).toHaveBeenCalledWith(1);
    expect(component.fetchComments).toHaveBeenCalled();
  });

  it('should handle error when deleting comment', () => {
    commentService.deleteComment.and.returnValue(throwError('Error deleting comment'));
    spyOn(console, 'error');

    component.deleteComment(1);

    expect(commentService.deleteComment).toHaveBeenCalledWith(1);
    expect(console.error).toHaveBeenCalledWith('Error deleting comment:', 'Error deleting comment');
  });
});
