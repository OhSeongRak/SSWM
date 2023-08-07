package com.ground.sswm.userStudyroom.model.dto;

import com.ground.sswm.user.model.dto.UserDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAttendResDto implements Comparable<UserAttendResDto> {

    private UserDto userDto;
    //출석일
    private int attendDays;

    @Override
    //출석률 순으로 정렬
    public int compareTo(UserAttendResDto userAttendResDto) {

        if (this.attendDays > userAttendResDto.getAttendDays()) {
            return -1;
        } else if (this.attendDays < userAttendResDto.getAttendDays()) {
            return 1;
        }
        return 0;
    }
}
