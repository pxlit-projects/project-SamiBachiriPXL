package be.pxl.services.controller;

import be.pxl.services.domain.dto.FilterRequest;
import be.pxl.services.domain.dto.PostRequest;
import be.pxl.services.domain.dto.PostUpdateRequest;
import be.pxl.services.service.IPostService;
import jakarta.persistence.PostUpdate;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/post")
public class PostController {
    private final IPostService postService;

    @PostMapping
    public ResponseEntity<?> addPost(@RequestBody PostRequest postRequest) {
        postService.addPost(postRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody PostUpdateRequest postRequest) {
        postService.updatePost(id, postRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAllPosts() {
        return new ResponseEntity<>(postService.getAllPosts(), HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity<?> filterPosts(@RequestBody FilterRequest filterRequest) {
        return new ResponseEntity<>(postService.filterPosts(filterRequest), HttpStatus.OK);
    }
}
