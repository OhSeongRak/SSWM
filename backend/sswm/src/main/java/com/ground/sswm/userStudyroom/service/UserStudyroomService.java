package com.ground.sswm.userStudyroom.service;


import com.ground.sswm.userStudyroom.model.dto.OnAirResDto;
import com.ground.sswm.userStudyroom.model.dto.UserAttendTop3ResDto;
import com.ground.sswm.userStudyroom.model.dto.UserStudyTimeResDto;
import java.util.List;

public interface UserStudyroomService {

    String joinUser(Long userId, Long studyroomId);

    void leaveUser(Long userId, Long studyroomId);

    List<OnAirResDto> searchUser(Long userId, Long studyroomId);

    void deleteUser(Long userId);

    void banUser(Long userId, Long targetId, Long studyroomId);

    void passRole(Long userId, Long targetId, Long studyroomId);

    List<UserStudyTimeResDto> searchDailyStudy(Long studyroomId);

    UserAttendTop3ResDto searchDailyAttend(Long studyroomId);

    boolean checkUserHost(Long userId, Long studyroomId);

    boolean checkMember(Long userId, Long studyroomId);
}
