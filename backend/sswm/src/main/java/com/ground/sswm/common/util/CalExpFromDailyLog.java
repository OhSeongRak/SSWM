package com.ground.sswm.common.util;

import static com.ground.sswm.common.util.UnixTimeUtil.getCurrentUnixTime;
import static com.ground.sswm.common.util.UnixTimeUtil.getStartEndOfPeriod;

import com.ground.sswm.common.util.dto.ExpDto;
import com.ground.sswm.dailyLog.model.DailyLog;
import com.ground.sswm.dailyLog.model.dto.DailyLogDto;
import java.time.ZoneId;
import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CalExpFromDailyLog {

    public static ExpDto getTimeAndScoreFromDailyLog(Long userId, List<DailyLog> dailyLogs) {
        long studyTime = 0;
        long restTime = 0;
        int stretchScore = 0;

        //데일리 로그에 대해
        for (DailyLog dailyLog : dailyLogs) {
            DailyLogDto dailyLogDto = DailyLogDto.from(dailyLog);

            //해당 유저의 데일리 로그이면 시git 간 및 점수 더해줌
            if (dailyLog.getUser().getId() == userId) {
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
    public static float calExp(long studyTime, long restTime, int stretchScore) {
        float studyMin = studyTime / 60f;
        float restMin = restTime / 60f;
        float exp = 100f;
        exp *= Math.min(studyMin, 500f)/500f;
        exp *= 0.7f + 0.3f * (
            Math.min(restMin + stretchScore / 30f, studyMin / 5f) /
                (studyMin / 5f)
        );
        log.debug("exp : " +exp);
        return Float.isNaN(exp) ? 0 : exp ;
    }
}
