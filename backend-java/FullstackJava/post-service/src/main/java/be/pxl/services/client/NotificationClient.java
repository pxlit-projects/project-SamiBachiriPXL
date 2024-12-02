package be.pxl.services.client;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "notification-service")
public interface NotificationClient {
}
