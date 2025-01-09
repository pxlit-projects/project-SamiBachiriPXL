package be.pxl.services.controller;

import be.pxl.services.domain.dto.CommentRequest;
import be.pxl.services.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/{postId}")
    public ResponseEntity<?> saveComment(@RequestHeader(value = "role") String role, @PathVariable Long postId, @RequestBody CommentRequest commentRequest) {
        if (role == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        commentService.addComment(postId, commentRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@RequestHeader(value = "role") String role, @PathVariable Long commentId) {
        if (role == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<?> updateComment(@RequestHeader(value = "role") String role, @PathVariable Long commentId, @RequestBody CommentRequest commentRequest) {
        if (role == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        commentService.updateComment(commentId, commentRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{postid}")
    public ResponseEntity<?> getComments(@RequestHeader(value = "role") String role, @PathVariable Long postid) {
        if (role == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(commentService.getCommentsByPostId(postid), HttpStatus.OK);
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<?> getComment(@RequestHeader(value = "role") String role, @PathVariable Long commentId) {
        if (role == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(commentService.getCommentById(commentId), HttpStatus.OK);
    }
}