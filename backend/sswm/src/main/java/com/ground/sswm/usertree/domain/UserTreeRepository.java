package com.ground.sswm.usertree.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTreeRepository extends JpaRepository<UserTree, Long> {

}
