package be.pxl.services.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class CommentTest {

    @Test
    public void testCommentBuilder() {
        Comment comment = Comment.builder()
                .comment("Test Comment")
                .author("Test Author")
                .postId(1L)
                .build();

        assertNotNull(comment);
        assertEquals("Test Comment", comment.getComment());
        assertEquals("Test Author", comment.getAuthor());
        assertEquals(1L, comment.getPostId());
    }

    @Test
    public void testCommentNoArgsConstructor() {
        Comment comment = new Comment();
        assertNotNull(comment);
    }

    @Test
    public void testCommentAllArgsConstructor() {
        Comment comment = new Comment(1L, "Test Comment", "Test Author", 1L);

        assertNotNull(comment);
        assertEquals(1L, comment.getId());
        assertEquals("Test Comment", comment.getComment());
        assertEquals("Test Author", comment.getAuthor());
        assertEquals(1L, comment.getPostId());
    }

    @Test
    public void testCommentDataAnnotation() {
        Comment comment = new Comment();
        comment.setId(1L);
        comment.setComment("Test Comment");
        comment.setAuthor("Test Author");
        comment.setPostId(1L);

        assertEquals(1L, comment.getId());
        assertEquals("Test Comment", comment.getComment());
        assertEquals("Test Author", comment.getAuthor());
        assertEquals(1L, comment.getPostId());
    }
}