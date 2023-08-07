package com.ground.sswm.tag.repository;

import com.ground.sswm.tag.model.Tag;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TagRepository extends JpaRepository<Tag, Long> {

    @Query("select t.name from Tag t"
        + " where t.id in"
        + " (select st.tag.id from StudyroomTag st"
        + " where st.studyroom.id = :studyroomId)")
    List<String> findTags(@Param("studyroomId") Long id);

    Tag findByName(String name);

    @Query("select t.name from Tag t")
    List<String> findAllTagName();
}
