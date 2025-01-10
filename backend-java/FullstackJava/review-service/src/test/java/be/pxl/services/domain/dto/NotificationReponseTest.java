package be.pxl.services.domain.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class NotificationReponseTest {

    @Test
    public void testNotificationReponseBuilder() {
        NotificationReponse notificationReponse = NotificationReponse.builder()
                .id(1L)
                .message("Test Message")
                .sender("Test Sender")
                .postId(1L)
                .build();

        assertNotNull(notificationReponse);
        assertEquals(1L, notificationReponse.getId());
        assertEquals("Test Message", notificationReponse.getMessage());
        assertEquals("Test Sender", notificationReponse.getSender());
        assertEquals(1L, notificationReponse.getPostId());
    }

    @Test
    public void testNotificationReponseNoArgsConstructor() {
        NotificationReponse notificationReponse = new NotificationReponse();
        assertNotNull(notificationReponse);
    }

    @Test
    public void testNotificationReponseAllArgsConstructor() {
        NotificationReponse notificationReponse = new NotificationReponse(1L, "Test Message", "Test Sender", 1L);

        assertNotNull(notificationReponse);
        assertEquals(1L, notificationReponse.getId());
        assertEquals("Test Message", notificationReponse.getMessage());
        assertEquals("Test Sender", notificationReponse.getSender());
        assertEquals(1L, notificationReponse.getPostId());
    }

    @Test
    public void testNotificationReponseDataAnnotation() {
        NotificationReponse notificationReponse = new NotificationReponse();
        notificationReponse.setId(1L);
        notificationReponse.setMessage("Test Message");
        notificationReponse.setSender("Test Sender");
        notificationReponse.setPostId(1L);

        assertEquals(1L, notificationReponse.getId());
        assertEquals("Test Message", notificationReponse.getMessage());
        assertEquals("Test Sender", notificationReponse.getSender());
        assertEquals(1L, notificationReponse.getPostId());
    }
}