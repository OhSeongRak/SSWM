package com.ground.sswm.tree.service;

import com.ground.sswm.tree.domain.Tree;
import com.ground.sswm.tree.domain.TreeRepository;
import com.ground.sswm.tree.dto.TreeDto;
import com.ground.sswm.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TreeServiceImpl implements TreeService{
    private final TreeRepository treeRepository;

    public void saveTree(UserDto userDto, Long id, TreeDto treeDto){
        Tree tree= Tree.from(treeDto);
        treeRepository.save(tree);
    }
}
