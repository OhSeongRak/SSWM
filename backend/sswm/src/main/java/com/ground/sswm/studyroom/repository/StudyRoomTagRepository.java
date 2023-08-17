package com.ground.sswm.studyroom.repository;

import com.ground.sswm.studyroom.model.StudyroomTag;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyRoomTagRepository extends JpaRepository<StudyroomTag, Long> {
    void deleteByStudyroomId(Long studyroomId);

    List<StudyroomTag> findAllByStudyroomId(Long studyroomId);
}
