package be.pxl.services.domain.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ReviewRequestTest {

    @Test
    public void testReviewRequestBuilder() {
        ReviewRequest reviewRequest = ReviewRequest.builder()
                .content("Test Content")
                .editor("Test Editor")
                .approved(true)
                .build();

        assertNotNull(reviewRequest);
        assertEquals("Test Content", reviewRequest.getContent());
        assertEquals("Test Editor", reviewRequest.getEditor());
        assertTrue(reviewRequest.isApproved());
    }

    @Test
    public void testReviewRequestNoArgsConstructor() {
        ReviewRequest reviewRequest = new ReviewRequest();
        assertNotNull(reviewRequest);
    }

    @Test
    public void testReviewRequestAllArgsConstructor() {
        ReviewRequest reviewRequest = new ReviewRequest("Test Content", "Test Editor", true);

        assertNotNull(reviewRequest);
        assertEquals("Test Content", reviewRequest.getContent());
        assertEquals("Test Editor", reviewRequest.getEditor());
        assertTrue(reviewRequest.isApproved());
    }

    @Test
    public void testReviewRequestDataAnnotation() {
        ReviewRequest reviewRequest = new ReviewRequest();
        reviewRequest.setContent("Test Content");
        reviewRequest.setEditor("Test Editor");
        reviewRequest.setApproved(true);

        assertEquals("Test Content", reviewRequest.getContent());
        assertEquals("Test Editor", reviewRequest.getEditor());
        assertTrue(reviewRequest.isApproved());
    }
}