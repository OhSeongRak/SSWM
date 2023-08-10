package com.ground.sswm.common.util;

import static com.ground.sswm.common.util.UnixTimeUtil.getCurrentUnixTime;
import static com.ground.sswm.common.util.UnixTimeUtil.getStartEndOfPeriod;

import com.ground.sswm.common.util.dto.ExpDto;
import com.ground.sswm.dailyLog.model.DailyLog;
import com.ground.sswm.dailyLog.model.dto.DailyLogDto;
import java.time.ZoneId;
import java.util.List;

public class CalExpFromDailyLog {

    public static ExpDto getTimeAndScoreFromDailyLog(Long userId, List<DailyLog> dailyLogs){
        long studyTime = 0;
        long restTime = 0;
        int stretchScore = 0;

        //데일리 로그에 대해
        for (DailyLog dailyLog: dailyLogs){
            DailyLogDto dailyLogDto = DailyLogDto.from(dailyLog);

            //해당 유저의 데일리 로그이면 시간 및 점수 더해줌
            if (dailyLog.getUser().getId() == userId){
                studyTime += dailyLogDto.getStudyTime();
                restTime += dailyLogDto.getRestTime();
                stretchScore += dailyLogDto.getStretchScore();
            }
        }
        ExpDto expDto = new ExpDto();
        expDto.setStudyTime(studyTime);
        expDto.setStretchScore(stretchScore);
        expDto.setRestTime(restTime);
        return expDto;
    }
    public static int calExp(long studyTime, long restTime, int stretchScore){
        int studyMin = (int) studyTime / 60;
        int restMin = (int) restTime / 60;

        int exp = 100;
        exp *= Math.min(studyMin, 500)/500;
        exp *= 0.7 + 0.3 * (
            Math.min(restMin + stretchScore / 30, studyMin / 5) /
                (studyMin / 5)
        );

        return exp;
    }
}
