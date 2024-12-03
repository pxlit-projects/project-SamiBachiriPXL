package be.pxl.services.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comment")
public class Comment {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;
        private String comment;
        private String author;
        private Long postId;
}
