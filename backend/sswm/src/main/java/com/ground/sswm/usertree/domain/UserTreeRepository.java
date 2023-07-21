package com.ground.sswm.usertree.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTreeRepository extends JpaRepository<UserTree, Long> {

}
