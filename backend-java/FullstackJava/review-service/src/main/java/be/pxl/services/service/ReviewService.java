package be.pxl.services.service;

import be.pxl.services.domain.Review;
import be.pxl.services.domain.dto.ReviewRequest;
import be.pxl.services.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService implements IReviewService {
    private final RabbitTemplate rabbitTemplate;
    private final ReviewRepository reviewRepository;

    @Override
    @RabbitListener(queues = "myQueue")
    public void createReview(Long id, ReviewRequest reviewRequest) {
        Review review = Review.builder()
                .content(reviewRequest.getContent())
                .editor(reviewRequest.getEditor())
                .approved(reviewRequest.isApproved())
                .postId(id)
                .build();

        reviewRepository.save(review);
        if (review.isApproved()) {
            rabbitTemplate.convertAndSend("myQueue", "Post approved: " + review.getPostId());
        } else {
            rabbitTemplate.convertAndSend("myQueue", "Post rejected: " + review.getPostId() + ". Comment: " + review.getContent());
        }
    }
}
