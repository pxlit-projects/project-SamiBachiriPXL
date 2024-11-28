package be.pxl.services.domain.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterRequest {
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date date;
    private String content;
    private String author;
}
