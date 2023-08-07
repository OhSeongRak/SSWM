package com.ground.sswm.userStudyroom.model.dto;

import com.ground.sswm.user.model.dto.UserDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserStudyTimeResDto {

    private UserDto userDto;
    private long studyTime;

}
