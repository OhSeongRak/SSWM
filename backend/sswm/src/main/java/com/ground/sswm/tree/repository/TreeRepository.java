package com.ground.sswm.tree.repository;

import com.ground.sswm.tree.model.Tree;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TreeRepository extends JpaRepository<Tree, Long> {
    Optional<Tree> findById(Long treeId);
}
