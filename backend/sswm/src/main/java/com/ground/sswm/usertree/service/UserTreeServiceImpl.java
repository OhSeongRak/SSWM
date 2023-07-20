package com.ground.sswm.usertree.service;

import com.ground.sswm.usertree.domain.UserTree;
import com.ground.sswm.usertree.domain.UserTreeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserTreeServiceImpl {
    private final UserTreeRepository userTreeRepository;

    public List<UserTree> findAll(){
        return userTreeRepository.findAll();
    }
}
