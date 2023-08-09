package com.ground.sswm.userStudyroom.model.dto;

import com.ground.sswm.user.model.dto.UserDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAttendDto implements Comparable<UserAttendDto> {

    private UserDto userDto;
    //출석일
    private int attendDays;

    @Override
    //출석률 순으로 정렬
    public int compareTo(UserAttendDto userAttendDto) {

        if (this.attendDays > userAttendDto.getAttendDays()) {
            return -1;
        } else if (this.attendDays < userAttendDto.getAttendDays()) {
            return 1;
        }
        return 0;
    }
}
