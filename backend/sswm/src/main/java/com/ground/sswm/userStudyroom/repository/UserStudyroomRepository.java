package com.ground.sswm.userStudyroom.repository;

import com.ground.sswm.userStudyroom.model.UserStudyroom;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStudyroomRepository extends JpaRepository<UserStudyroom, Long> {

    Optional<UserStudyroom> findByUserIdAndStudyroomIdAndIsDeleted(Long targetId, Long studyroomId, Boolean isDeleted);
    Optional<UserStudyroom> findByUserIdAndStudyroomId(Long targetId, Long studyroomId);

    List<UserStudyroom> findAllByStudyroomIdAndIsDeletedAndIsBan(Long studyroomId,
        boolean isDeleted, boolean isBan);

    List<UserStudyroom> findAllByStudyroomId(Long studyroomId);

    List<UserStudyroom> findAllByUserIdAndIsDeleted(Long userId, boolean isDeleted);

}
