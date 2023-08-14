package com.ground.sswm.usertree.service;

import com.ground.sswm.usertree.model.dto.UserTreeResDto;
import java.util.List;

public interface UserTreeService {

    UserTreeResDto randTree(Long userId);

    List<UserTreeResDto> searchTree(Long userId);

}
