package com.ground.sswm.tree.service;

import com.ground.sswm.tree.domain.Tree;
import com.ground.sswm.tree.dto.TreeDto;
import com.ground.sswm.user.dto.UserDto;

import java.util.List;

public interface TreeService {
    void saveTree(UserDto userDto, Long id, TreeDto treeDto);
}
