package com.ground.sswm.usertree.service;

import com.ground.sswm.usertree.domain.UserTree;
import com.ground.sswm.usertree.domain.UserTreeRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserTreeServiceImpl implements UserTreeService {

    private final UserTreeRepository userTreeRepository;

    public List<UserTree> findAll() {
        return userTreeRepository.findAll();
    }
}
