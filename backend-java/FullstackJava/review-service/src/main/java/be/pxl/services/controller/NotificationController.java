package be.pxl.services.controller;

import be.pxl.services.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class NotificationController {
    private final ReviewService reviewService;

    @GetMapping("/notifications/{postId}")
    public ResponseEntity<?> getNotifications(@RequestHeader(value = "role") String role, @PathVariable long postId) {
        if (!role.equals("redacteur")) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(reviewService.getNotifications(postId), HttpStatus.OK);
    }

    @DeleteMapping("/notifications/{id}")
    public ResponseEntity<?> deleteNotification(@RequestHeader(value = "role") String role, @PathVariable long id) {
        if (!role.equals("redacteur")) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        reviewService.deleteNotification(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
