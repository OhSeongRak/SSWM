package com.ground.sswm.userStudyroom.domain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyroomRepository extends JpaRepository<UserStudyroom, Long> {

}
