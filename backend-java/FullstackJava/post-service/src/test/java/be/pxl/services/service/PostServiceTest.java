package be.pxl.services.service;

import be.pxl.services.domain.Post;
import be.pxl.services.domain.Review;
import be.pxl.services.domain.ReviewStatus;
import be.pxl.services.domain.dto.PostRequest;
import be.pxl.services.domain.dto.PostResponse;
import be.pxl.services.domain.dto.PostUpdateRequest;
import be.pxl.services.repository.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @InjectMocks
    private PostService postService;

    @Captor
    private ArgumentCaptor<Post> postCaptor;

    private Post post;
    private PostRequest postRequest;
    private PostUpdateRequest postUpdateRequest;
    private Review review;

    @BeforeEach
    public void setUp() {
        post = Post.builder()
                .id(1L)
                .title("Test Title")
                .content("Test Content")
                .author("Test Author")
                .creationDate(new Date())
                .isConcept(true)
                .reviewStatus(ReviewStatus.PENDING)
                .build();

        postRequest = PostRequest.builder()
                .title("Test Title")
                .content("Test Content")
                .author("Test Author")
                .isConcept(true)
                .build();

        postUpdateRequest = PostUpdateRequest.builder()
                .title("Updated Title")
                .content("Updated Content")
                .isConcept(false)
                .build();

        review = new Review(1L, 1L, "Editor", "Review Content", true);
    }

    @Test
    public void testAddPost() {
        postService.addPost(postRequest);
        verify(postRepository).save(postCaptor.capture());
        Post savedPost = postCaptor.getValue();
        assertEquals(postRequest.getTitle(), savedPost.getTitle());
        assertEquals(postRequest.getContent(), savedPost.getContent());
        assertEquals(postRequest.getAuthor(), savedPost.getAuthor());
        assertTrue(savedPost.isConcept());
        assertEquals(ReviewStatus.PENDING, savedPost.getReviewStatus());
    }

    @Test
    public void testGetAllPosts() {
        when(postRepository.findAll()).thenReturn(Collections.singletonList(post));
        List<PostResponse> posts = postService.getAllPosts();
        assertEquals(1, posts.size());
        assertEquals(post.getTitle(), posts.get(0).getTitle());
    }

    @Test
    public void testUpdatePost() {
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));
        postService.updatePost(1L, postUpdateRequest);
        verify(postRepository).save(postCaptor.capture());
        Post updatedPost = postCaptor.getValue();
        assertEquals(postUpdateRequest.getTitle(), updatedPost.getTitle());
        assertEquals(postUpdateRequest.getContent(), updatedPost.getContent());
        assertFalse(updatedPost.isConcept());
    }

    @Test
    public void testGetPublishedPosts() {
        post.setConcept(false);
        post.setReviewStatus(ReviewStatus.APPROVED);
        when(postRepository.findAll()).thenReturn(Collections.singletonList(post));
        List<PostResponse> posts = postService.getPublishedPosts();
        assertEquals(1, posts.size());
        assertEquals(post.getTitle(), posts.get(0).getTitle());
    }

    @Test
    public void testGetPostById() {
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));
        PostResponse postResponse = postService.getPostById(1L);
        assertEquals(post.getTitle(), postResponse.getTitle());
    }

    @Test
    public void testGetPostsByAuthor() {
        when(postRepository.findPostsByAuthor("Test Author")).thenReturn(Collections.singletonList(post));
        List<PostResponse> posts = postService.getPostsByAuthor("Test Author");
        assertEquals(1, posts.size());
        assertEquals(post.getTitle(), posts.get(0).getTitle());
    }

    @Test
    public void testHandleReview() {
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));
        postService.handleReview(review);
        verify(postRepository).save(postCaptor.capture());
        Post updatedPost = postCaptor.getValue();
        assertEquals(ReviewStatus.APPROVED, updatedPost.getReviewStatus());
        assertNull(updatedPost.getReviewComment());
    }

    @Test
    public void testHandleReviewRejected() {
        review.setApproved(false);
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));
        postService.handleReview(review);
        verify(postRepository).save(postCaptor.capture());
        Post updatedPost = postCaptor.getValue();
        assertEquals(ReviewStatus.REJECTED, updatedPost.getReviewStatus());
        assertEquals(review.getContent(), updatedPost.getReviewComment());
    }

    @Test
    public void testHandleReviewException() {
        when(postRepository.findById(1L)).thenThrow(new RuntimeException("Post not found"));
        postService.handleReview(review);
        verify(postRepository, never()).save(any(Post.class));
        // Verify that the error was logged
        // Note: You may need to use a logging framework or library to capture and assert log messages
    }
}