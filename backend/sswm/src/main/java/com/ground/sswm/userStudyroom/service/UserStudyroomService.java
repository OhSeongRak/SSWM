package com.ground.sswm.userStudyroom.service;


import com.ground.sswm.userStudyroom.dto.OnAirResDto;
import com.ground.sswm.userStudyroom.dto.UserAttendResDto;
import com.ground.sswm.userStudyroom.dto.UserStudyTimeResDto;
import java.util.List;

public interface UserStudyroomService {

    String joinUser(Long userId, Long studyroomId);

    void leaveUser(Long userId, Long studyroomId);

    List<OnAirResDto> searchUser(Long userId, Long studyroomId);


    void banUser(Long userId, Long targetId, Long studyroomId);

    void passRole(Long userId, Long targetId, Long studyroomId);

    List<UserStudyTimeResDto> searchDailyStudy(Long studyroomId);

    List<UserAttendResDto> searchDailyAttend(Long studyroomId, int startDate, int endDate);
}
