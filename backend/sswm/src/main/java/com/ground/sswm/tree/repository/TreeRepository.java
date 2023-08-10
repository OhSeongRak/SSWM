package com.ground.sswm.tree.repository;

import com.ground.sswm.tree.model.Tree;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TreeRepository extends JpaRepository<Tree, Long> {

    @Query("select t from Tree t where t.id in"
        + " (select ut.tree.id from UserTree ut where ut.user.id = :userId)")
    List<Tree> findTrees(@Param("userId") Long userId);
}
