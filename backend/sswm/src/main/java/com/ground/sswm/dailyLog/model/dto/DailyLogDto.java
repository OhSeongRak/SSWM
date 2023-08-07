package com.ground.sswm.dailyLog.model.dto;

import com.ground.sswm.dailyLog.model.DailyLog;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DailyLogDto {

    private long studyTime;
    private long restTime;
    private long date;

    @Builder
    public DailyLogDto(long studyTime, long restTime, long date) {
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
