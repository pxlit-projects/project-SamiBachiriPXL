package be.pxl.services.service;

import be.pxl.services.domain.Comment;
import be.pxl.services.domain.dto.CommentRequest;
import be.pxl.services.domain.dto.CommentResponse;
import be.pxl.services.repository.CommentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @InjectMocks
    private CommentService commentService;

    @Captor
    private ArgumentCaptor<Comment> commentCaptor;

    private Comment comment;
    private CommentRequest commentRequest;

    @BeforeEach
    public void setUp() {
        comment = Comment.builder()
                .id(1L)
                .comment("Test Comment")
                .author("Test Author")
                .postId(1L)
                .build();

        commentRequest = CommentRequest.builder()
                .comment("Test Comment")
                .author("Test Author")
                .build();
    }

    @Test
    public void testAddComment() {
        commentService.addComment(1L, commentRequest);
        verify(commentRepository).save(commentCaptor.capture());
        Comment savedComment = commentCaptor.getValue();
        assertEquals(commentRequest.getComment(), savedComment.getComment());
        assertEquals(commentRequest.getAuthor(), savedComment.getAuthor());
        assertEquals(1L, savedComment.getPostId());
    }

    @Test
    public void testDeleteComment() {
        commentService.deleteComment(1L);
        verify(commentRepository).deleteById(1L);
    }

    @Test
    public void testUpdateComment() {
        when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));
        commentService.updateComment(1L, commentRequest);
        verify(commentRepository).save(commentCaptor.capture());
        Comment updatedComment = commentCaptor.getValue();
        assertEquals(commentRequest.getComment(), updatedComment.getComment());
        assertEquals(commentRequest.getAuthor(), updatedComment.getAuthor());
    }

    @Test
    public void testGetCommentsByPostId() {
        when(commentRepository.findByPostId(1L)).thenReturn(Collections.singletonList(comment));
        List<CommentResponse> comments = commentService.getCommentsByPostId(1L);
        assertEquals(1, comments.size());
        assertEquals(comment.getComment(), comments.get(0).getComment());
    }

    @Test
    public void testGetCommentById() {
        when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));
        CommentResponse commentResponse = commentService.getCommentById(1L);
        assertEquals(comment.getComment(), commentResponse.getComment());
    }
}