package com.ground.sswm.userStudyroom.domain;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStudyroomRepository extends JpaRepository<UserStudyroom, Long> {
    Optional<UserStudyroom> findByUserIdAndStudyroomId(Long targetId, Long studyroomId);
    //UserStudyroom findByStudyroomId(Integer studyroomId);
}
