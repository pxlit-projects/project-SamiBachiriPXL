package be.pxl.services.service;

import be.pxl.services.domain.dto.ReviewRequest;

public interface IReviewService {
    void createReview(Long id, ReviewRequest reviewRequest);
}
