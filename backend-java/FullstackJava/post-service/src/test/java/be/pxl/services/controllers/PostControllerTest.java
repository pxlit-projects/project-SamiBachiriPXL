package be.pxl.services.controllers;

import be.pxl.services.domain.dto.PostRequest;
import be.pxl.services.repository.PostRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Testcontainers
@TestPropertySource(locations="classpath:application.properties")
@AutoConfigureMockMvc
public class PostControllerTest {
//    @Autowired
//    MockMvc mockMvc;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Autowired
//    private PostRepository employeeRepository;
//
//    @Container
//    private static MySQLContainer mySQLContainer = new MySQLContainer("mysql:5.7.37");
//
//    @DynamicPropertySource
//    static void setDatasourceProperties(DynamicPropertyRegistry registry) {
//        registry.add("spring.datasource.url", mySQLContainer::getJdbcUrl);
//        registry.add("spring.datasource.username", mySQLContainer::getUsername);
//        registry.add("spring.datasource.password", mySQLContainer::getPassword);
//    }
//
//    @Test
//    public void testCreatePost() throws Exception {
//        PostRequest postRequest = PostRequest.builder().author("dababy").title("title").content("content").build();
//        String postString = objectMapper.writeValueAsString(postRequest);
//
//        mockMvc.perform(post("")
//                        .header("role", "redacteur")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(postString))
//                .andExpect(status().isCreated());
//
//
//        assertEquals(1, employeeRepository.findAll().size());
//    }
}
