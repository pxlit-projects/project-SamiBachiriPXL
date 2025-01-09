package be.pxl.services.service;

import be.pxl.services.domain.Comment;
import be.pxl.services.domain.dto.CommentRequest;
import be.pxl.services.domain.dto.CommentResponse;
import be.pxl.services.repository.CommentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService implements ICommentService {
    private static final Logger log = LoggerFactory.getLogger(CommentService.class);
    private final CommentRepository commentRepository;

    public void addComment(Long postId, CommentRequest commentRequest) {
        Comment comment = Comment.builder()
                .comment(commentRequest.getComment())
                .author(commentRequest.getAuthor())
                .postId(postId)
                .build();
        commentRepository.save(comment);
        log.info("Comment saved: {}", comment);
    }

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
        log.info("Comment deleted");
    }

    @Transactional
    public void updateComment(Long commentId, CommentRequest commentRequest) {
        Comment comment = commentRepository.findById(commentId).
                orElseThrow(() -> new RuntimeException("Comment not found"));
        comment.setComment(commentRequest.getComment());
        comment.setAuthor(commentRequest.getAuthor());
        commentRepository.save(comment);
        log.info("Comment updated: {}", comment);
    }

    public List<CommentResponse> getCommentsByPostId(long postId) {
        return commentRepository.findByPostId(postId).stream()
                .map(comment -> CommentResponse.builder()
                        .id(comment.getId())
                        .comment(comment.getComment())
                        .author(comment.getAuthor())
                        .postId(comment.getPostId())
                        .build())
                .toList();
    }

    @Override
    public CommentResponse getCommentById(long commentId) {
        return commentRepository.findById(commentId)
                .map(comment -> CommentResponse.builder()
                        .id(comment.getId())
                        .comment(comment.getComment())
                        .author(comment.getAuthor())
                        .postId(comment.getPostId())
                        .build())
                .orElseThrow(() -> new RuntimeException("Comment not found"));
    }
}