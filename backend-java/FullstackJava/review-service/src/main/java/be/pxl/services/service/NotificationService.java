package be.pxl.services.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class NotificationService {
    public void sendNotification(String editor, String message) {
        log.info("Receiving notification . . .");
        log.info("Sending. . . {} ", message);
        log.info("TO  {}", editor);
    }
}