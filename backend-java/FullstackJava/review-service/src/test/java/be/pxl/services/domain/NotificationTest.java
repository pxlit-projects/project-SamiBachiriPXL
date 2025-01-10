package be.pxl.services.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class NotificationTest {

    @Test
    public void testNotificationBuilder() {
        Notification notification = Notification.builder()
                .message("Test Message")
                .sender("Test Sender")
                .postId(1L)
                .build();

        assertNotNull(notification);
        assertEquals("Test Message", notification.getMessage());
        assertEquals("Test Sender", notification.getSender());
        assertEquals(1L, notification.getPostId());
    }

    @Test
    public void testNotificationNoArgsConstructor() {
        Notification notification = new Notification();
        assertNotNull(notification);
    }

    @Test
    public void testNotificationAllArgsConstructor() {
        Notification notification = new Notification(1L, "Test Message", "Test Sender", 1L);

        assertNotNull(notification);
        assertEquals(1L, notification.getId());
        assertEquals("Test Message", notification.getMessage());
        assertEquals("Test Sender", notification.getSender());
        assertEquals(1L, notification.getPostId());
    }

    @Test
    public void testNotificationDataAnnotation() {
        Notification notification = new Notification();
        notification.setId(1L);
        notification.setMessage("Test Message");
        notification.setSender("Test Sender");
        notification.setPostId(1L);

        assertEquals(1L, notification.getId());
        assertEquals("Test Message", notification.getMessage());
        assertEquals("Test Sender", notification.getSender());
        assertEquals(1L, notification.getPostId());
    }
}