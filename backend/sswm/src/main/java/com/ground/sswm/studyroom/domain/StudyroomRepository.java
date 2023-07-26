package com.ground.sswm.studyroom.domain;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyroomRepository extends JpaRepository<Studyroom, Long> {

    // Studyroom findById(Long studyroomId);
    Optional<Studyroom> findByName(String name);

    @Query("select s from Studyroom s where s.isPublic = true and s.id in"
        + " (select st.studyroom.id from StudyroomTag st where st.tag.id in"
        + " (select t.id from Tag t where t.name in :tagNames))"
        + " and"
        + " (s.name like %:searchKeyword%)")
    List<Studyroom> list(@Param("tagNames") List<String> tagNames,
        @Param("searchKeyword") String searchKeyword);
}
