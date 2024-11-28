package be.pxl.services.service;

import be.pxl.services.domain.Post;
import be.pxl.services.domain.dto.FilterRequest;
import be.pxl.services.domain.dto.PostRequest;
import be.pxl.services.domain.dto.PostResponse;
import be.pxl.services.domain.dto.PostUpdateRequest;
import be.pxl.services.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService implements IPostService {
    private final PostRepository postRepository;

    @Override
    public void addPost(PostRequest postRequest) {
        Post post = Post.builder()
                .title(postRequest.getTitle())
                .content(postRequest.getContent())
                .author(postRequest.getAuthor())
                .date(new Date())
                .isConcept(postRequest.isConcept())
                .build();
        postRepository.save(post);
    }

    @Override
    public List<PostResponse> getAllPosts() {
        return postRepository.findAll().stream()
                .filter(post -> !post.isConcept())
                .sorted(Comparator.comparing(Post::getDate).reversed())
                .map(post -> new PostResponse(post.getTitle(), post.getContent(), post.getAuthor(), post.getDate()))
                .toList();
    }

    @Override
    public void updatePost(Long id, PostUpdateRequest postUpdateRequest) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        post.setTitle(postUpdateRequest.getTitle());
        post.setContent(postUpdateRequest.getContent());
        post.setDate(new Date());
        post.setConcept(postUpdateRequest.isConcept());
        postRepository.save(post);
    }

    @Override
    public List<PostResponse> filterPosts(FilterRequest filterRequest) {
        String author = filterRequest.getAuthor();
        if (author != null && author.isEmpty()) {
            author = null;
        }
        List<Post> filteredPosts = postRepository.filterPosts(
                filterRequest.getContent(),
                author,
                filterRequest.getDate()
        );
        return filteredPosts.stream()
                .map(post -> new PostResponse(post.getTitle(), post.getContent(), post.getAuthor(), post.getDate()))
                .toList();
    }
}