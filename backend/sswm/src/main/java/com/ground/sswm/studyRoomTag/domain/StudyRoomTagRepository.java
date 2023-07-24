package com.ground.sswm.studyRoomTag.domain;

import com.ground.sswm.tag.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyRoomTagRepository extends JpaRepository<StudyroomTag, Long> {

}
