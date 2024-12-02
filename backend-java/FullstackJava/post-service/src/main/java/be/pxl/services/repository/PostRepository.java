package be.pxl.services.repository;


import be.pxl.services.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("SELECT p FROM Post p WHERE " +
            "(:content IS NULL OR p.content LIKE %:content%) AND " +
            "(:author IS NULL OR :author = '' OR p.author = :author) AND " +
            "(:date IS NULL OR p.creationDate = :date)")
    List<Post> filterPosts(@Param("content") String content,
                           @Param("author") String author,
                           @Param("date") Date date);
}
