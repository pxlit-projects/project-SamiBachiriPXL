package be.pxl.services.client;

import be.pxl.services.domain.dto.NotificationRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "review-service")
public interface NotificationClient {
    @PostMapping("/notifications")
    ResponseEntity<?> createNotification(@RequestBody NotificationRequest notificationRequest);
}
