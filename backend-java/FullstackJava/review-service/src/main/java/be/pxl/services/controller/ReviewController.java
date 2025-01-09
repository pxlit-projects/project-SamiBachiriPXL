package be.pxl.services.controller;

import be.pxl.services.domain.dto.ReviewRequest;
import be.pxl.services.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping("/{postId}")
    public ResponseEntity<?> createReview(@RequestHeader(value = "role") String role, @PathVariable Long postId, @RequestBody ReviewRequest reviewRequest) {
        if (!role.equals("reviewer")) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        reviewService.createReview(postId, reviewRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
