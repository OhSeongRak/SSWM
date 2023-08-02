package com.ground.sswm.dailyLog.dto;

import com.ground.sswm.dailyLog.domain.DailyLog;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DailyLogDto {

    private int studyTime;
    private int restTime;
    private long date;

    @Builder
    public DailyLogDto(int studyTime, int restTime, long date) {
        this.studyTime = studyTime;
        this.restTime = restTime;
        this.date = date;
    }

    public static DailyLogDto from(DailyLog dailyLog) {
        return DailyLogDto.builder()
            .studyTime(dailyLog.getStudyTime())
            .restTime(dailyLog.getRestTime())
            .date(dailyLog.getDate())
            .build();
    }

}
