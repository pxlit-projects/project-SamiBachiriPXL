package be.pxl.services.domain.dto;

import be.pxl.services.domain.ReviewStatus;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

public class PostResponseTest {

    @Test
    public void testPostResponseBuilder() {
        Date now = new Date();
        PostResponse postResponse = PostResponse.builder()
                .id(1L)
                .title("Test Title")
                .content("Test Content")
                .author("Test Author")
                .isConcept(true)
                .date(now)
                .reviewStatus(ReviewStatus.PENDING)
                .reviewComment("Test Comment")
                .build();

        assertNotNull(postResponse);
        assertEquals(1L, postResponse.getId());
        assertEquals("Test Title", postResponse.getTitle());
        assertEquals("Test Content", postResponse.getContent());
        assertEquals("Test Author", postResponse.getAuthor());
        assertTrue(postResponse.isConcept());
        assertEquals(now, postResponse.getDate());
        assertEquals(ReviewStatus.PENDING, postResponse.getReviewStatus());
        assertEquals("Test Comment", postResponse.getReviewComment());
    }

    @Test
    public void testPostResponseNoArgsConstructor() {
        PostResponse postResponse = new PostResponse();
        assertNotNull(postResponse);
    }

    @Test
    public void testPostResponseAllArgsConstructor() {
        Date now = new Date();
        PostResponse postResponse = new PostResponse(1L, "Test Title", "Test Content", "Test Author", true, now, ReviewStatus.PENDING, "Test Comment");

        assertNotNull(postResponse);
        assertEquals(1L, postResponse.getId());
        assertEquals("Test Title", postResponse.getTitle());
        assertEquals("Test Content", postResponse.getContent());
        assertEquals("Test Author", postResponse.getAuthor());
        assertTrue(postResponse.isConcept());
        assertEquals(now, postResponse.getDate());
        assertEquals(ReviewStatus.PENDING, postResponse.getReviewStatus());
        assertEquals("Test Comment", postResponse.getReviewComment());
    }

    @Test
    public void testPostResponseDataAnnotation() {
        PostResponse postResponse = new PostResponse();
        postResponse.setId(1L);
        postResponse.setTitle("Test Title");
        postResponse.setContent("Test Content");
        postResponse.setAuthor("Test Author");
        postResponse.setConcept(true);
        Date now = new Date();
        postResponse.setDate(now);
        postResponse.setReviewStatus(ReviewStatus.PENDING);
        postResponse.setReviewComment("Test Comment");

        assertEquals(1L, postResponse.getId());
        assertEquals("Test Title", postResponse.getTitle());
        assertEquals("Test Content", postResponse.getContent());
        assertEquals("Test Author", postResponse.getAuthor());
        assertTrue(postResponse.isConcept());
        assertEquals(now, postResponse.getDate());
        assertEquals(ReviewStatus.PENDING, postResponse.getReviewStatus());
        assertEquals("Test Comment", postResponse.getReviewComment());
    }
}