package com.ground.sswm.tree.service;

import com.ground.sswm.tree.model.dto.TreeDto;
import com.ground.sswm.user.model.dto.UserDto;
import java.util.List;

public interface TreeService {

    void saveTree(UserDto userDto, Long id, TreeDto treeDto);

    List<TreeDto> findTrees(Long userId);
}
