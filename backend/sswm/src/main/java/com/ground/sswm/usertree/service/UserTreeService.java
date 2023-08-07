package com.ground.sswm.usertree.service;

import com.ground.sswm.usertree.model.dto.UserTreeDto;
import java.util.List;

public interface UserTreeService {

    String randTree(Long userId);

    List<UserTreeDto> searchTree(Long userId, Long treeId);

}
