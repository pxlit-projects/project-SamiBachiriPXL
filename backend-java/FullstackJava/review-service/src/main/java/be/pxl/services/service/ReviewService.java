package be.pxl.services.service;

import be.pxl.services.domain.Notification;
import be.pxl.services.domain.Review;
import be.pxl.services.domain.dto.NotificationReponse;
import be.pxl.services.domain.dto.ReviewRequest;
import be.pxl.services.repository.NotificationRepository;
import be.pxl.services.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService implements IReviewService {
    private final RabbitTemplate rabbitTemplate;
    private final ReviewRepository reviewRepository;
    private final NotificationService notificationService;
    private final NotificationRepository notificationRepository;

    @Override
    public void createReview(Long id, ReviewRequest reviewRequest) {
        if (!reviewRequest.isApproved() && reviewRequest.getContent().isEmpty()) {
            throw new RuntimeException("Review content can't be empty when not approved.");
        }
        if (reviewRepository.findByPostId(id) != null) {
            Review review = reviewRepository.findByPostId(id);
            review.setContent(reviewRequest.getContent());
            review.setEditor(reviewRequest.getEditor());
            review.setApproved(reviewRequest.isApproved());
            reviewRepository.save(review);
            rabbitTemplate.convertAndSend("myQueue",  review);
            sendNotification(review);
        }
        else{
            Review review = Review.builder()
                    .content(reviewRequest.getContent())
                    .editor(reviewRequest.getEditor())
                    .approved(reviewRequest.isApproved())
                    .postId(id)
                    .build();
            reviewRepository.save(review);
            rabbitTemplate.convertAndSend("myQueue",  review);
            sendNotification(review);
        }
    }

    private void sendNotification(Review review) {
        String message = review.isApproved() ?
                "Your post has been approved." :
                "Your post has been rejected.";
        Notification notification = Notification.builder()
                .message(message)
                .sender(review.getEditor())
                .postId(review.getPostId())
                .build();
        notificationRepository.save(notification);
        notificationService.sendNotification(review.getEditor(), message);
    }

    public List<NotificationReponse> getNotifications(long postId) {
        return notificationRepository.findByPostId(postId).stream().map(notification -> NotificationReponse.builder()
                .id(notification.getId())
                .message(notification.getMessage())
                .sender(notification.getSender())
                .postId(notification.getPostId())
                .build()).toList();
    }

    public void deleteNotification(long id) {
        notificationRepository.deleteById(id);
    }
}