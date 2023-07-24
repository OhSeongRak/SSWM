package com.ground.sswm.tree.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TreeRepository  extends JpaRepository<Tree, Long> {
}
