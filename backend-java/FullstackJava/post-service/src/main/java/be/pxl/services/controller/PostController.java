package be.pxl.services.controller;

import be.pxl.services.domain.dto.PostRequest;
import be.pxl.services.domain.dto.PostUpdateRequest;
import be.pxl.services.service.IPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
//@RequestMapping("/posts")
public class PostController {
    private final IPostService postService;

    @PostMapping
    public ResponseEntity<?> addPost(@RequestHeader(value = "role") String role, @RequestBody PostRequest postRequest) {
        if (!role.equals("redacteur")) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        postService.addPost(postRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updatePost(@RequestHeader(value = "role") String role, @PathVariable Long id, @RequestBody PostUpdateRequest postRequest) {
        if (!role.equals("redacteur")) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        postService.updatePost(id, postRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPost(@PathVariable Long id) {
        return new ResponseEntity<>(postService.getPostById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAllPosts(@RequestHeader(value = "role") String role) {
        if (role.equals("redacteur") || role.equals("reviewer")) {
            return new ResponseEntity<>(postService.getAllPosts(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @GetMapping("/published")
    public ResponseEntity<?> getAllPublishedPosts() {
        return new ResponseEntity<>(postService.getPublishedPosts(), HttpStatus.OK);
    }

    @GetMapping("/author/{author}")
    public ResponseEntity<?> getPostsByAuthor(@PathVariable String author) {
        return new ResponseEntity<>(postService.getPostsByAuthor(author), HttpStatus.OK);
    }
}
