import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { environment } from '../environments/environment.development';
import { Post } from './models/post.model';
import { PostRequest } from './models/postRequest.model';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get posts', () => {
    const mockPosts: Post[] = [{
      id: 1,
      title: 'Test Post',
      content: 'Test Content',
      author: 'Author',
      creationDate: new Date('2023-01-01'),
      isConcept: false,
      reviewStatus: 'approved',
      reviewComment: 'Looks good'
    }];

    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(1);
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(environment.apiUrlPost);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should get a post by ID', () => {
    const postId = '1';
    const mockPost: Post = {
      id: 1,
      title: 'Test Post',
      content: 'Test Content',
      author: 'Author',
      creationDate: new Date('2023-01-01'),
      isConcept: false,
      reviewStatus: 'approved',
      reviewComment: 'Looks good'
    };

    service.getPost(postId).subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${environment.apiUrlPost}${postId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  it('should get published posts', () => {
    const mockPosts: Post[] = [{
      id: 1,
      title: 'Published Post',
      content: 'Published Content',
      author: 'Author',
      creationDate: new Date('2023-01-01'),
      isConcept: false,
      reviewStatus: 'approved',
      reviewComment: 'Looks good'
    }];

    service.getPublisedPosts().subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`${environment.apiUrlPost}published`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should create a post', () => {
    const postRequest: PostRequest = {
      title: 'New Post',
      content: 'New Content',
      author: 'Author',
      isConcept: false
    };

    service.createPost(postRequest).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(environment.apiUrlPost);
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('should update a post', () => {
    const postRequest: PostRequest = {
      title: 'Updated Post',
      content: 'Updated Content',
      author: 'Author',
      isConcept: true
    };
    const postId = '1';

    service.updatePost(postRequest, postId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrlPost}${postId}`);
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('should get posts by author', () => {
    const author = 'Author';
    const mockPosts: Post[] = [{
      id: 1,
      title: 'Author Post',
      content: 'Author Content',
      author: 'Author',
      creationDate: new Date('2023-01-01'),
      isConcept: false,
      reviewStatus: 'approved',
      reviewComment: 'Looks good'
    }];

    service.getPostsByAuthor(author).subscribe(posts => {
      expect(posts.length).toBe(1);
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`${environment.apiUrlPost}author/${author}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });
});
