package be.pxl.services.domain;

import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

public class PostTest {

    @Test
    public void testPostBuilder() {
        Date now = new Date();
        Post post = Post.builder()
                .title("Test Title")
                .content("Test Content")
                .author("Test Author")
                .creationDate(now)
                .isConcept(true)
                .reviewStatus(ReviewStatus.PENDING)
                .reviewComment("Test Comment")
                .build();

        assertNotNull(post);
        assertEquals("Test Title", post.getTitle());
        assertEquals("Test Content", post.getContent());
        assertEquals("Test Author", post.getAuthor());
        assertEquals(now, post.getCreationDate());
        assertTrue(post.isConcept());
        assertEquals(ReviewStatus.PENDING, post.getReviewStatus());
        assertEquals("Test Comment", post.getReviewComment());
    }

    @Test
    public void testPostNoArgsConstructor() {
        Post post = new Post();
        assertNotNull(post);
    }

    @Test
    public void testPostAllArgsConstructor() {
        Date now = new Date();
        Post post = new Post(1L, "Test Title", "Test Content", "Test Author", now, true, ReviewStatus.PENDING, "Test Comment");

        assertNotNull(post);
        assertEquals(1L, post.getId());
        assertEquals("Test Title", post.getTitle());
        assertEquals("Test Content", post.getContent());
        assertEquals("Test Author", post.getAuthor());
        assertEquals(now, post.getCreationDate());
        assertTrue(post.isConcept());
        assertEquals(ReviewStatus.PENDING, post.getReviewStatus());
        assertEquals("Test Comment", post.getReviewComment());
    }

    @Test
    public void testPostDataAnnotation() {
        Post post = new Post();
        post.setId(1L);
        post.setTitle("Test Title");
        post.setContent("Test Content");
        post.setAuthor("Test Author");
        Date now = new Date();
        post.setCreationDate(now);
        post.setConcept(true);
        post.setReviewStatus(ReviewStatus.PENDING);
        post.setReviewComment("Test Comment");

        assertEquals(1L, post.getId());
        assertEquals("Test Title", post.getTitle());
        assertEquals("Test Content", post.getContent());
        assertEquals("Test Author", post.getAuthor());
        assertEquals(now, post.getCreationDate());
        assertTrue(post.isConcept());
        assertEquals(ReviewStatus.PENDING, post.getReviewStatus());
        assertEquals("Test Comment", post.getReviewComment());
    }
}