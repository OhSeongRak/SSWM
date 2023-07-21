package com.ground.sswm.userStudyroom.service;


import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.userStudyroom.dto.OnAirResDto;
import com.ground.sswm.userStudyroom.dto.UserStudyTimeResDto;
import com.ground.sswm.userStudyroom.dto.UserStudyroomReqDto;
import java.util.List;

public interface UserStudyroomService {
    void join(Long userId, Long studyroomId, UserStudyroomReqDto userStudyroomReqDto);

    OnAirResDto searchUser(Long userId, Long studyroomId);

    void leave(Long userId, Long studyroomId);

    void ban(Long userId, Long targetId, Long studyroomId);

    void pass(Long userId, Long targetId, Long studyroomId);

    List<UserStudyTimeResDto> searchDailyStudy(Long studyroomId);

    List<UserDto> searchDailyAttend(Long userId, Long studyroomId);
}
