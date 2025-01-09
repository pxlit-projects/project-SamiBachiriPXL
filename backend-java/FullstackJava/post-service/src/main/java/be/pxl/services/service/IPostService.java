package be.pxl.services.service;

import be.pxl.services.domain.Post;
import be.pxl.services.domain.dto.FilterRequest;
import be.pxl.services.domain.dto.PostRequest;
import be.pxl.services.domain.dto.PostResponse;
import be.pxl.services.domain.dto.PostUpdateRequest;

import java.util.Date;
import java.util.List;

public interface IPostService {
    void addPost(PostRequest postRequest);
    List<PostResponse> getAllPosts();
    void updatePost(Long id, PostUpdateRequest postRequest);
    List<PostResponse> getPublishedPosts();
    PostResponse getPostById(Long id);
    List<PostResponse> getPostsByAuthor(String author);
}
