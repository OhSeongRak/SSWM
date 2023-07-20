package com.ground.sswm.tree.service;

import com.ground.sswm.tree.domain.Tree;
import com.ground.sswm.tree.domain.TreeRepository;
import com.ground.sswm.tree.dto.TreeDto;
import com.ground.sswm.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TreeServiceImpl {
    private final TreeRepository treeRepository;

    public void saveTree(UserDto userDto, Integer id, TreeDto treeDto){
        Tree tree= Tree.from(treeDto);
        treeRepository.save(tree);
    }
}
