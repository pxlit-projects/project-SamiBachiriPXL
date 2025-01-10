package be.pxl.services.domain.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class PostUpdateRequestTest {

    @Test
    public void testPostUpdateRequestBuilder() {
        PostUpdateRequest postUpdateRequest = PostUpdateRequest.builder()
                .title("Test Title")
                .content("Test Content")
                .isConcept(true)
                .build();

        assertNotNull(postUpdateRequest);
        assertEquals("Test Title", postUpdateRequest.getTitle());
        assertEquals("Test Content", postUpdateRequest.getContent());
        assertTrue(postUpdateRequest.isConcept());
    }

    @Test
    public void testPostUpdateRequestNoArgsConstructor() {
        PostUpdateRequest postUpdateRequest = new PostUpdateRequest();
        assertNotNull(postUpdateRequest);
    }

    @Test
    public void testPostUpdateRequestAllArgsConstructor() {
        PostUpdateRequest postUpdateRequest = new PostUpdateRequest("Test Title", "Test Content", true);

        assertNotNull(postUpdateRequest);
        assertEquals("Test Title", postUpdateRequest.getTitle());
        assertEquals("Test Content", postUpdateRequest.getContent());
        assertTrue(postUpdateRequest.isConcept());
    }

    @Test
    public void testPostUpdateRequestDataAnnotation() {
        PostUpdateRequest postUpdateRequest = new PostUpdateRequest();
        postUpdateRequest.setTitle("Test Title");
        postUpdateRequest.setContent("Test Content");
        postUpdateRequest.setConcept(true);

        assertEquals("Test Title", postUpdateRequest.getTitle());
        assertEquals("Test Content", postUpdateRequest.getContent());
        assertTrue(postUpdateRequest.isConcept());
    }
}