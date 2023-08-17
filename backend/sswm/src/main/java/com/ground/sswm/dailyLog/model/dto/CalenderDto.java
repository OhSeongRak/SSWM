package com.ground.sswm.dailyLog.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CalenderDto {
    private float studyExp;
    private float restTimeExp;
    private float stretchExp;
    private int studyTime;
    private int stretchScore;
}
