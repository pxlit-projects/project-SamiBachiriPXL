package be.pxl.services.controller;

import be.pxl.services.domain.dto.CommentRequest;
import be.pxl.services.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/{postId}")
    public ResponseEntity<?> saveComment(@PathVariable Long postId, @RequestBody CommentRequest commentRequest) {
        commentService.addComment(postId, commentRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<?> updateComment(@PathVariable Long commentId, @RequestBody CommentRequest commentRequest) {
        commentService.updateComment(commentId, commentRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getComments() {
        return new ResponseEntity<>(commentService.getComments(), HttpStatus.OK);
    }
}