package be.pxl.services.service;

import be.pxl.services.domain.dto.NotificationReponse;
import be.pxl.services.domain.dto.NotificationRequest;
import be.pxl.services.domain.dto.ReviewRequest;

import java.util.List;

public interface IReviewService {
    void createReview(Long id, ReviewRequest reviewRequest);
    void createNotification(NotificationRequest notificationRequest);
    void deleteNotification(long id);
    List<NotificationReponse> getNotifications(long postId);
}
