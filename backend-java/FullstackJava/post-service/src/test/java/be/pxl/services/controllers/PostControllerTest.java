package be.pxl.services.controllers;

import be.pxl.services.domain.Post;
import be.pxl.services.domain.ReviewStatus;
import be.pxl.services.domain.dto.PostRequest;
import be.pxl.services.domain.dto.PostUpdateRequest;
import be.pxl.services.repository.PostRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@Testcontainers
@TestPropertySource(locations = "classpath:application-test.properties")
@AutoConfigureMockMvc
public class PostControllerTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PostRepository postRepository;

    @Container
    private static MySQLContainer mySQLContainer = new MySQLContainer("mysql:5.7.37");

    @DynamicPropertySource
    static void setDatasourceProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", mySQLContainer::getJdbcUrl);
        registry.add("spring.datasource.username", mySQLContainer::getUsername);
        registry.add("spring.datasource.password", mySQLContainer::getPassword);
    }

    @BeforeEach
    public void setup() {
        postRepository.deleteAll();
    }

    @Test
    public void testCreatePost() throws Exception {
        PostRequest postRequest = PostRequest.builder().author("dababy").title("title").content("content").build();
        String postString = objectMapper.writeValueAsString(postRequest);

        mockMvc.perform(post("")
                        .header("role", "redacteur")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(postString))
                .andExpect(status().isCreated());

        assertEquals(1, postRepository.findAll().size());
    }

    @Test
    public void testUpdatePost() throws Exception {
        Post post = Post.builder().author("dababy").title("title").content("content").build();
        postRepository.save(post);
        PostUpdateRequest postUpdateRequest = PostUpdateRequest.builder().title("new title").content("new content").build();
        String postUpdateString = objectMapper.writeValueAsString(postUpdateRequest);

        mockMvc.perform(post("/" + post.getId())
                        .header("role", "redacteur")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(postUpdateString))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetPost() throws Exception {
        Post post = Post.builder().author("dababy").title("title").content("content").build();
        postRepository.save(post);

        mockMvc.perform(get("/" + post.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.author").value("dababy"))
                .andExpect(jsonPath("$.title").value("title"))
                .andExpect(jsonPath("$.content").value("content"));
    }

    @Test
    public void testGetAllPublishedPosts() throws Exception {
        Post post1 = Post.builder().author("dababy").title("title1").content("content1").reviewStatus(ReviewStatus.APPROVED).build();
        Post post2 = Post.builder().author("dababy").title("title2").content("content2").reviewStatus(ReviewStatus.PENDING).build();
        postRepository.save(post1);
        postRepository.save(post2);

        mockMvc.perform(get("/published"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    public void testGetPostsByAuthor() throws Exception {
        Post post1 = Post.builder().author("dababy").title("title1").content("content1").build();
        Post post2 = Post.builder().author("anotherAuthor").title("title2").content("content2").build();
        postRepository.save(post1);
        postRepository.save(post2);

        mockMvc.perform(get("/author/dababy"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }
}