package com.ground.sswm.dailyLog.service;


import static com.ground.sswm.common.util.UnixTimeUtil.getStartEndOfPeriod;

import com.ground.sswm.common.util.CalExpFromDailyLog;
import com.ground.sswm.common.util.UnixTimeUtil;
import com.ground.sswm.common.util.dto.ExpDto;
import com.ground.sswm.dailyLog.exception.DailyLogNotFoundException;
import com.ground.sswm.dailyLog.model.DailyLog;
import com.ground.sswm.dailyLog.model.dto.CalenderDto;
import com.ground.sswm.dailyLog.model.dto.DailyLogDto;
import com.ground.sswm.dailyLog.repository.DailyLogRepository;
import com.ground.sswm.event.repository.StudyEventRepository;
import com.ground.sswm.studyroom.exception.StudyroomNotFoundException;
import com.ground.sswm.studyroom.model.Studyroom;
import com.ground.sswm.studyroom.repository.StudyroomRepository;
import com.ground.sswm.user.exception.UserNotFoundException;
import com.ground.sswm.user.model.User;
import com.ground.sswm.userStudyroom.model.UserStudyroom;
import com.ground.sswm.user.repository.UserRepository;
import com.ground.sswm.userStudyroom.exception.UserStudyroomNotFoundException;
import com.ground.sswm.userStudyroom.repository.UserStudyroomRepository;
import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DailyLogServiceImpl implements DailyLogService {

    private final DailyLogRepository dailyLogRepository;
    private final UserRepository userRepository;
    private final StudyroomRepository studyroomRepository;
    private final UserStudyroomRepository userStudyroomRepository;
    private final StudyEventRepository studyEventRepository;

    @Override
    public void create(Long studyroomId, Long userId) {
        Studyroom studyroom = studyroomRepository.findById(studyroomId).orElseThrow(
            () -> new StudyroomNotFoundException("해당 스터디룸이 없습니다.")
        );

        User user = userRepository.findById(userId).orElseThrow(
            () -> new UserNotFoundException("회원이 아닙니다.")
        );

        UserStudyroom userStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(userId,
            studyroomId).orElseThrow(
            () -> new UserStudyroomNotFoundException("해당 스터디룸에 가입되어 있지 않습니다.")
        );

        if (userStudyroom.isDeleted()) {
            throw new UserStudyroomNotFoundException("해당 스터디룸에 가입되어 있지 않습니다.");
        }

        ZonedDateTime currentTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        int hour = currentTime.getHour();
        long now = UnixTimeUtil.getCurrentUnixTime();
        log.debug("now : " + now);
        int dayBefore = (hour < 4) ? 1 : 0;
        long[] days = getStartEndOfPeriod(now, ZoneId.of("Asia/Seoul"), dayBefore);
        for (long day : days) {
            log.debug("days : " + day);
        }
        log.debug("date :" + days[0]);

        if (dailyLogRepository.findByUserIdAndStudyroomIdAndDateBetween(userId, studyroomId,
            days[0], days[1]).isEmpty()) {
            DailyLog newDailyLog = new DailyLog();

            newDailyLog.setDate(days[0]);
            newDailyLog.setStudyroom(studyroom);
            newDailyLog.setUser(user);
            dailyLogRepository.save(newDailyLog);
        }
        ;
    }

    @Override
    public CalenderDto selcectDailyLogsByUserId(Long userId, long start, long end) {
        List<DailyLog> dailyLogs = dailyLogRepository.findAllByUserIdAndDateBetween(
            userId, start, end);

        if (dailyLogs.isEmpty()) {
            throw new DailyLogNotFoundException("DailyLog가 존재하지 않습니다.");
        }

        int startIndex = 0;

        float totalStudyTimeExp = 0;
        float totalRestTimeExp = 0;
        float totalStretchExp = 0;

        for (long i = start; i <= end; i += 86400L) {
            List<DailyLog> dayDailyLog = new ArrayList<>();
            for (int j = startIndex; j < dailyLogs.size(); j++) {
                if (dailyLogs.get(j).getDate() == i) {
                    dayDailyLog.add(dailyLogs.get(j));
                } else {
                    startIndex += j;
                    break;
                }
            }
            if (dayDailyLog.isEmpty()) {
                continue;
            }
            ExpDto expDto = CalExpFromDailyLog.getTimeAndScoreFromDailyLog(userId,
                dayDailyLog);

            float totalExp = CalExpFromDailyLog.calExp(
                expDto.getStudyTime(),
                expDto.getRestTime(),
                expDto.getStretchScore()
            );

            float restTimeExp = CalExpFromDailyLog.calExp(
                expDto.getStudyTime(),
                0L,
                expDto.getStretchScore()
            );

            float stretchExp = CalExpFromDailyLog.calExp(
                expDto.getStudyTime(),
                expDto.getRestTime(),
                0
            );

            restTimeExp = totalExp - restTimeExp;
            stretchExp = totalExp - stretchExp;
            float studyTimeExp = totalExp - restTimeExp - stretchExp;

            totalStudyTimeExp += studyTimeExp;
            totalRestTimeExp += restTimeExp;
            totalStretchExp += stretchExp;
        }

        float studyTime = 0f;
        int stretchScore=0;

        for (DailyLog dailyLog : dailyLogs) {
            studyTime += dailyLog.getStudyTime();
            stretchScore += dailyLog.getStretchScore();
        }

        CalenderDto calenderDto = new CalenderDto();

        calenderDto.setStudyTime((int) (studyTime/60f));
        calenderDto.setStudyExp(totalStudyTimeExp);
        calenderDto.setRestTimeExp(totalRestTimeExp);
        calenderDto.setStretchExp(totalStretchExp);
        calenderDto.setStretchScore(stretchScore);

        return calenderDto;
    }

    @Override
    public DailyLogDto getDailylog(Long userId, Long studyroomId) {
        ZonedDateTime currentTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        int hour = currentTime.getHour();
        long now = UnixTimeUtil.getCurrentUnixTime();
        int dayBefore = (hour < 4) ? 1 : 0;
        long[] days = getStartEndOfPeriod(now, ZoneId.of("Asia/Seoul"), dayBefore);

        return DailyLogDto.from(
            dailyLogRepository.findAllByUserIdAndStudyroomIdAndDate(userId, studyroomId, days[0]));
    }

    @Override
    @Transactional
    public void setStretchingScore(Long userId,Long studyroomId, int score) {
        ZonedDateTime currentTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        int hour = currentTime.getHour();
        long now = UnixTimeUtil.getCurrentUnixTime();
        int dayBefore = (hour < 4) ? 1 : 0;
        long[] days = getStartEndOfPeriod(now, ZoneId.of("Asia/Seoul"), dayBefore);

        DailyLog dailyLog = dailyLogRepository.findAllByUserIdAndStudyroomIdAndDate(userId, studyroomId, days[0]);
        dailyLog.setStretchScore(dailyLog.getStretchScore() + score);
    }
}
