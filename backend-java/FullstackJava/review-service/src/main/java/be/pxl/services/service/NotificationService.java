package be.pxl.services.service;

import be.pxl.services.domain.Notification;
import be.pxl.services.domain.dto.NotificationReponse;
import be.pxl.services.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    public void sendNotification(String editor, String message) {
        log.info("Receiving notification . . .");
        log.info("Sending. . . {} ", message);
        log.info("TO  {}", editor);

    }


}