package com.ground.sswm.userStudyroom.service;


import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.userStudyroom.dto.OnAirResDto;
import com.ground.sswm.userStudyroom.dto.UserStudyroomDto;

public interface UserStudyroomService {
    void join(UserDto userDto, Integer studyroomId, UserStudyroomDto userStudyroomDto);

    OnAirResDto searchUser(UserDto userDto, Integer studyroomId);

    void leave(UserDto userDto, Integer studyroomId);

    void ban(UserDto userDto, Integer targetId, Integer studyroomId);

    void pass(UserDto userDto, Integer userId, Integer studyroomId);
}
