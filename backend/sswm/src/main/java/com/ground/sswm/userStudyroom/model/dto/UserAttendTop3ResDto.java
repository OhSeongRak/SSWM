package com.ground.sswm.userStudyroom.model.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAttendTop3ResDto {
    private int month;
    private int daysOfMonth;
    private List<UserAttendDto> users;
}
