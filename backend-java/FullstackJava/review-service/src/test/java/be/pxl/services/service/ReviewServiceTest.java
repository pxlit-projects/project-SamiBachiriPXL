package be.pxl.services.service;

import be.pxl.services.domain.Notification;
import be.pxl.services.domain.Review;
import be.pxl.services.domain.dto.NotificationReponse;
import be.pxl.services.domain.dto.ReviewRequest;
import be.pxl.services.repository.NotificationRepository;
import be.pxl.services.repository.ReviewRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ReviewServiceTest {

    @Mock
    private RabbitTemplate rabbitTemplate;

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private NotificationService notificationService;

    @Mock
    private NotificationRepository notificationRepository;

    @InjectMocks
    private ReviewService reviewService;

    @Captor
    private ArgumentCaptor<Review> reviewCaptor;

    @Captor
    private ArgumentCaptor<Notification> notificationCaptor;

    private Review review;
    private ReviewRequest reviewRequest;

    @BeforeEach
    public void setUp() {
        review = Review.builder()
                .id(1L)
                .postId(1L)
                .editor("Test Editor")
                .content("Test Content")
                .approved(true)
                .build();

        reviewRequest = ReviewRequest.builder()
                .content("Test Content")
                .editor("Test Editor")
                .approved(true)
                .build();
    }

    @Test
    public void testCreateReview() {
        when(reviewRepository.findByPostId(1L)).thenReturn(null);
        reviewService.createReview(1L, reviewRequest);
        verify(reviewRepository).save(reviewCaptor.capture());
        Review savedReview = reviewCaptor.getValue();
        assertEquals(reviewRequest.getContent(), savedReview.getContent());
        assertEquals(reviewRequest.getEditor(), savedReview.getEditor());
        assertTrue(savedReview.isApproved());
        verify(rabbitTemplate).convertAndSend("myQueue", savedReview);
        verify(notificationRepository).save(notificationCaptor.capture());
        Notification savedNotification = notificationCaptor.getValue();
        assertEquals("Your post has been approved.", savedNotification.getMessage());
        assertEquals(reviewRequest.getEditor(), savedNotification.getSender());
        assertEquals(1L, savedNotification.getPostId());
    }

    @Test
    public void testCreateReviewUpdateExisting() {
        when(reviewRepository.findByPostId(1L)).thenReturn(review);
        reviewRequest.setApproved(false);
        reviewRequest.setContent("Updated Content");
        reviewService.createReview(1L, reviewRequest);
        verify(reviewRepository).save(reviewCaptor.capture());
        Review updatedReview = reviewCaptor.getValue();
        assertEquals(reviewRequest.getContent(), updatedReview.getContent());
        assertEquals(reviewRequest.getEditor(), updatedReview.getEditor());
        assertFalse(updatedReview.isApproved());
        verify(rabbitTemplate).convertAndSend("myQueue", updatedReview);
        verify(notificationRepository).save(notificationCaptor.capture());
        Notification savedNotification = notificationCaptor.getValue();
        assertEquals("Your post has been rejected.", savedNotification.getMessage());
        assertEquals(reviewRequest.getEditor(), savedNotification.getSender());
        assertEquals(1L, savedNotification.getPostId());
    }

    @Test
    public void testCreateReviewThrowsExceptionWhenContentEmpty() {
        reviewRequest.setApproved(false);
        reviewRequest.setContent("");
        assertThrows(RuntimeException.class, () -> reviewService.createReview(1L, reviewRequest));
    }

    @Test
    public void testGetNotifications() {
        Notification notification = Notification.builder()
                .id(1L)
                .message("Test Message")
                .sender("Test Sender")
                .postId(1L)
                .build();
        when(notificationRepository.findByPostId(1L)).thenReturn(Collections.singletonList(notification));
        List<NotificationReponse> notifications = reviewService.getNotifications(1L);
        assertEquals(1, notifications.size());
        assertEquals(notification.getMessage(), notifications.get(0).getMessage());
    }

    @Test
    public void testDeleteNotification() {
        reviewService.deleteNotification(1L);
        verify(notificationRepository).deleteById(1L);
    }
}