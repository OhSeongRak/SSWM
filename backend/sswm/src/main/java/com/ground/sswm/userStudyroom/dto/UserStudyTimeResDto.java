package com.ground.sswm.userStudyroom.dto;

import com.ground.sswm.user.dto.UserDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserStudyTimeResDto {

    private UserDto userDto;
    private long studyTime;

}
