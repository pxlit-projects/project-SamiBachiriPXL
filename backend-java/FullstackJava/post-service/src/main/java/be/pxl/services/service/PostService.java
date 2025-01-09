package be.pxl.services.service;

import be.pxl.services.domain.Post;
import be.pxl.services.domain.Review;
import be.pxl.services.domain.ReviewStatus;
import be.pxl.services.domain.dto.PostRequest;
import be.pxl.services.domain.dto.PostResponse;
import be.pxl.services.domain.dto.PostUpdateRequest;
import be.pxl.services.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostService implements IPostService {
    private final PostRepository postRepository;

    @Override
    public void addPost(PostRequest postRequest) {
        Post post = Post.builder()
                .title(postRequest.getTitle())
                .content(postRequest.getContent())
                .author(postRequest.getAuthor())
                .creationDate(new Date())
                .isConcept(postRequest.isConcept())
                .reviewStatus(ReviewStatus.PENDING)
                .build();
        postRepository.save(post);
    }

    @Override
    public List<PostResponse> getAllPosts() {
        return postRepository.findAll().stream()
                .sorted(Comparator.comparing(Post::getCreationDate).reversed())
                .map(post -> new PostResponse(post.getId(), post.getTitle(), post.getContent(), post.getAuthor(), post.isConcept(),post.getCreationDate(), post.getReviewStatus(), post.getReviewComment()))
                .toList();
    }

    @Override
    public void updatePost(Long id, PostUpdateRequest postUpdateRequest) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        post.setTitle(postUpdateRequest.getTitle());
        post.setContent(postUpdateRequest.getContent());
        post.setConcept(postUpdateRequest.isConcept());
        postRepository.save(post);
    }

    @Override
    public List<PostResponse> getPublishedPosts() {
        return postRepository.findAll().stream()
                .filter(post -> !post.isConcept())
                .filter(post -> post.getReviewStatus() == ReviewStatus.APPROVED)
                .sorted(Comparator.comparing(Post::getCreationDate).reversed())
                .map(post -> new PostResponse(post.getId(), post.getTitle(), post.getContent(), post.getAuthor(), post.isConcept(),post.getCreationDate(), post.getReviewStatus(), post.getReviewComment()))
                .toList();
    }

    @Override
    public PostResponse getPostById(Long id) {
        return postRepository.findById(id)
                .map(post -> new PostResponse(post.getId(), post.getTitle(), post.getContent(), post.getAuthor(), post.isConcept(),post.getCreationDate(), post.getReviewStatus(), post.getReviewComment()))
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    @Override
    public List<PostResponse> getPostsByAuthor(String author) {
        return postRepository.findPostsByAuthor(author).stream()
                .sorted(Comparator.comparing(Post::getCreationDate).reversed())
                .map(post -> new PostResponse(post.getId(), post.getTitle(), post.getContent(), post.getAuthor(), post.isConcept(),post.getCreationDate(), post.getReviewStatus(), post.getReviewComment()))
                .toList();
    }

    @RabbitListener(queues = "myQueue")
    public void handleReview(Review review) {
        try {
            Post post = postRepository.findById(review.getPostId())
                    .orElseThrow(() -> new RuntimeException("Post not found"));
            if (review.isApproved()) {
                post.setReviewStatus(ReviewStatus.APPROVED);
                post.setReviewComment(null);
            } else {
                post.setReviewStatus(ReviewStatus.REJECTED);
                post.setReviewComment(review.getContent());
            }
            postRepository.save(post);
        } catch (RuntimeException e) {
            log.error("Failed to handle review: {}", e.getMessage());
        }
    }

}