package com.ground.sswm.usertree.repository;

import com.ground.sswm.usertree.model.UserTree;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTreeRepository extends JpaRepository<UserTree, Long> {

    @Query("select t.id from Tree t where t.id not in"
        + "(select ut.tree.id from UserTree ut where ut.user.id = :userId)")
    List<Long> findByUserIdNotIn(@Param("userId") Long userId);

    List<UserTree> findAllByUserId(Long userId);

}
