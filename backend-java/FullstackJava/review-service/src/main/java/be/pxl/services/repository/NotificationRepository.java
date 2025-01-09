package be.pxl.services.repository;

import be.pxl.services.domain.Notification;
import be.pxl.services.domain.Review;
import be.pxl.services.domain.dto.NotificationReponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByPostId(long postId);
}
