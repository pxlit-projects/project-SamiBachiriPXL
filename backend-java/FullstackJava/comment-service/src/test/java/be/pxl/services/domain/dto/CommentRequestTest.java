package be.pxl.services.domain.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class CommentRequestTest {

    @Test
    public void testCommentRequestBuilder() {
        CommentRequest commentRequest = CommentRequest.builder()
                .comment("Test Comment")
                .author("Test Author")
                .build();

        assertNotNull(commentRequest);
        assertEquals("Test Comment", commentRequest.getComment());
        assertEquals("Test Author", commentRequest.getAuthor());
    }

    @Test
    public void testCommentRequestNoArgsConstructor() {
        CommentRequest commentRequest = new CommentRequest();
        assertNotNull(commentRequest);
    }

    @Test
    public void testCommentRequestAllArgsConstructor() {
        CommentRequest commentRequest = new CommentRequest("Test Comment", "Test Author");

        assertNotNull(commentRequest);
        assertEquals("Test Comment", commentRequest.getComment());
        assertEquals("Test Author", commentRequest.getAuthor());
    }

    @Test
    public void testCommentRequestDataAnnotation() {
        CommentRequest commentRequest = new CommentRequest();
        commentRequest.setComment("Test Comment");
        commentRequest.setAuthor("Test Author");

        assertEquals("Test Comment", commentRequest.getComment());
        assertEquals("Test Author", commentRequest.getAuthor());
    }
}