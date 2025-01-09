package be.pxl.services.domain.dto;

import be.pxl.services.domain.ReviewStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private String author;
    private boolean isConcept;
    private Date date;
    private ReviewStatus reviewStatus;
    private String reviewComment;
}