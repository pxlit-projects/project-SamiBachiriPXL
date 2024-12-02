package be.pxl.services.controller;

import be.pxl.services.domain.dto.ReviewRequest;
import be.pxl.services.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/review")
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping("/{postId}")
    public ResponseEntity<?> createReview(@PathVariable Long postId, @RequestBody ReviewRequest reviewRequest) {
        reviewService.createReview(postId, reviewRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
