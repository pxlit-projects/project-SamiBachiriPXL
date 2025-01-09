package be.pxl.services.service;

import be.pxl.services.domain.dto.CommentRequest;
import be.pxl.services.domain.dto.CommentResponse;

import java.util.List;

public interface ICommentService {
    void addComment(Long postId, CommentRequest commentRequest);
    void deleteComment(Long commentId);
    void updateComment(Long commentId, CommentRequest commentRequest);
    List<CommentResponse> getCommentsByPostId(long postId);
    CommentResponse getCommentById(long commentId);
}
