package be.pxl.services.domain.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class PostRequestTest {

    @Test
    public void testPostRequestBuilder() {
        PostRequest postRequest = PostRequest.builder()
                .title("Test Title")
                .content("Test Content")
                .author("Test Author")
                .isConcept(true)
                .build();

        assertNotNull(postRequest);
        assertEquals("Test Title", postRequest.getTitle());
        assertEquals("Test Content", postRequest.getContent());
        assertEquals("Test Author", postRequest.getAuthor());
        assertTrue(postRequest.isConcept());
    }

    @Test
    public void testPostRequestNoArgsConstructor() {
        PostRequest postRequest = new PostRequest();
        assertNotNull(postRequest);
    }

    @Test
    public void testPostRequestAllArgsConstructor() {
        PostRequest postRequest = new PostRequest("Test Title", "Test Content", "Test Author", true);

        assertNotNull(postRequest);
        assertEquals("Test Title", postRequest.getTitle());
        assertEquals("Test Content", postRequest.getContent());
        assertEquals("Test Author", postRequest.getAuthor());
        assertTrue(postRequest.isConcept());
    }

    @Test
    public void testPostRequestDataAnnotation() {
        PostRequest postRequest = new PostRequest();
        postRequest.setTitle("Test Title");
        postRequest.setContent("Test Content");
        postRequest.setAuthor("Test Author");
        postRequest.setConcept(true);

        assertEquals("Test Title", postRequest.getTitle());
        assertEquals("Test Content", postRequest.getContent());
        assertEquals("Test Author", postRequest.getAuthor());
        assertTrue(postRequest.isConcept());
    }
}