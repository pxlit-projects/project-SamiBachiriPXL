package be.pxl.services.service;

import be.pxl.services.repository.NotificationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.event.Level;
import org.springframework.boot.test.system.CapturedOutput;
import org.springframework.boot.test.system.OutputCaptureExtension;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@ExtendWith(OutputCaptureExtension.class)
public class NotificationServiceTest {

    @Mock
    private NotificationRepository notificationRepository;

    @InjectMocks
    private NotificationService notificationService;

    @Test
    public void testSendNotification(CapturedOutput output) {
        String editor = "Test Editor";
        String message = "Test Message";

        notificationService.sendNotification(editor, message);

        assertTrue(output.getOut().contains("Receiving notification . . ."));
        assertTrue(output.getOut().contains("Sending. . . Test Message"));
        assertTrue(output.getOut().contains("TO  Test Editor"));
    }
}