package be.pxl.services.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ReviewTest {

    @Test
    public void testReviewBuilder() {
        Review review = Review.builder()
                .postId(1L)
                .editor("Test Editor")
                .content("Test Content")
                .approved(true)
                .build();

        assertNotNull(review);
        assertEquals(1L, review.getPostId());
        assertEquals("Test Editor", review.getEditor());
        assertEquals("Test Content", review.getContent());
        assertTrue(review.isApproved());
    }

    @Test
    public void testReviewNoArgsConstructor() {
        Review review = new Review();
        assertNotNull(review);
    }

    @Test
    public void testReviewAllArgsConstructor() {
        Review review = new Review(1L, 1L, "Test Editor", "Test Content", true);

        assertNotNull(review);
        assertEquals(1L, review.getId());
        assertEquals(1L, review.getPostId());
        assertEquals("Test Editor", review.getEditor());
        assertEquals("Test Content", review.getContent());
        assertTrue(review.isApproved());
    }

    @Test
    public void testReviewDataAnnotation() {
        Review review = new Review();
        review.setId(1L);
        review.setPostId(1L);
        review.setEditor("Test Editor");
        review.setContent("Test Content");
        review.setApproved(true);

        assertEquals(1L, review.getId());
        assertEquals(1L, review.getPostId());
        assertEquals("Test Editor", review.getEditor());
        assertEquals("Test Content", review.getContent());
        assertTrue(review.isApproved());
    }
}