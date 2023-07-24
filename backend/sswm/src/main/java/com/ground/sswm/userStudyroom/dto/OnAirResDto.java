package com.ground.sswm.userStudyroom.dto;

import com.ground.sswm.user.dto.UserDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OnAirResDto {
    private UserDto userDto;

    private boolean isInLive;

    @Builder
    public OnAirResDto(UserDto userDto, boolean isInLive) {
        this.userDto = userDto;
        this.isInLive = isInLive;
    }

}
