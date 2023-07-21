package com.ground.sswm.studyroom.domain;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyroomRepository extends JpaRepository<Studyroom, Long> {

//    Studyroom findById(Long studyroomId);
    Optional<Studyroom> findByName(String name);
}
