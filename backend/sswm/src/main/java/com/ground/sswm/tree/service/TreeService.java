package com.ground.sswm.tree.service;

import com.ground.sswm.tree.model.dto.TreeDto;
import com.ground.sswm.user.model.dto.UserDto;

public interface TreeService {

    void saveTree(UserDto userDto, Long id, TreeDto treeDto);
}
