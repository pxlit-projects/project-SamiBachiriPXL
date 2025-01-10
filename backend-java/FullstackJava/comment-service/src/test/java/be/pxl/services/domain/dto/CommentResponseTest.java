package be.pxl.services.domain.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class CommentResponseTest {

    @Test
    public void testCommentResponseBuilder() {
        CommentResponse commentResponse = CommentResponse.builder()
                .id(1L)
                .comment("Test Comment")
                .author("Test Author")
                .postId(1L)
                .build();

        assertNotNull(commentResponse);
        assertEquals(1L, commentResponse.getId());
        assertEquals("Test Comment", commentResponse.getComment());
        assertEquals("Test Author", commentResponse.getAuthor());
        assertEquals(1L, commentResponse.getPostId());
    }

    @Test
    public void testCommentResponseNoArgsConstructor() {
        CommentResponse commentResponse = new CommentResponse();
        assertNotNull(commentResponse);
    }

    @Test
    public void testCommentResponseAllArgsConstructor() {
        CommentResponse commentResponse = new CommentResponse(1L, "Test Comment", "Test Author", 1L);

        assertNotNull(commentResponse);
        assertEquals(1L, commentResponse.getId());
        assertEquals("Test Comment", commentResponse.getComment());
        assertEquals("Test Author", commentResponse.getAuthor());
        assertEquals(1L, commentResponse.getPostId());
    }

    @Test
    public void testCommentResponseDataAnnotation() {
        CommentResponse commentResponse = new CommentResponse();
        commentResponse.setId(1L);
        commentResponse.setComment("Test Comment");
        commentResponse.setAuthor("Test Author");
        commentResponse.setPostId(1L);

        assertEquals(1L, commentResponse.getId());
        assertEquals("Test Comment", commentResponse.getComment());
        assertEquals("Test Author", commentResponse.getAuthor());
        assertEquals(1L, commentResponse.getPostId());
    }
}