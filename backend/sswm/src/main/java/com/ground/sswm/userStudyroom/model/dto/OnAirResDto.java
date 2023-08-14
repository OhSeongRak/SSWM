package com.ground.sswm.userStudyroom.model.dto;

import com.ground.sswm.user.model.dto.UserDto;
import com.ground.sswm.userStudyroom.model.StudyMemberRole;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OnAirResDto {

    private UserDto userDto;
    //현재 라이브에 참여중인지
    private boolean isInLive;
    private StudyMemberRole role;
    private boolean isBan;

    public boolean getIsBan() {
        return this.isBan;
    }
    @Builder
    public OnAirResDto(UserDto userDto, boolean isInLive, StudyMemberRole role, boolean isBan) {
        this.userDto = userDto;
        this.isInLive = isInLive;
        this.role = role;
        this.isBan = isBan;
    }
}
