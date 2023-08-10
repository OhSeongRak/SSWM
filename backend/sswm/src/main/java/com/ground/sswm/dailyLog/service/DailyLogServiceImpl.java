package com.ground.sswm.dailyLog.service;


import static com.ground.sswm.common.util.UnixTimeUtil.getStartEndOfPeriod;

import com.ground.sswm.common.util.UnixTimeUtil;
import com.ground.sswm.dailyLog.exception.DailyLogNotFoundException;
import com.ground.sswm.dailyLog.model.DailyLog;
import com.ground.sswm.dailyLog.model.dto.DailyLogDto;
import com.ground.sswm.dailyLog.repository.DailyLogRepository;
import com.ground.sswm.studyroom.exception.StudyroomNotFoundException;
import com.ground.sswm.studyroom.model.Studyroom;
import com.ground.sswm.studyroom.repository.StudyroomRepository;
import com.ground.sswm.user.exception.UserNotFoundException;
import com.ground.sswm.user.model.User;
import com.ground.sswm.userStudyroom.model.UserStudyroom;
import com.ground.sswm.user.repository.UserRepository;
import com.ground.sswm.userStudyroom.exception.UserStudyroomNotFoundException;
import com.ground.sswm.userStudyroom.repository.UserStudyroomRepository;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class DailyLogServiceImpl implements DailyLogService {

    private final DailyLogRepository dailyLogRepository;
    private final UserRepository userRepository;
    private final StudyroomRepository studyroomRepository;
    private final UserStudyroomRepository userStudyroomRepository;
    @Override
    public void create(Long studyroomId, Long userId) {
        Studyroom studyroom = studyroomRepository.findById(studyroomId).orElseThrow(
            () -> new StudyroomNotFoundException("해당 스터디룸이 없습니다.")
        );

        User user = userRepository.findById(userId).orElseThrow(
            () -> new UserNotFoundException("회원이 아닙니다.")
        );

        UserStudyroom userStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(userId, studyroomId).orElseThrow(
            () -> new UserStudyroomNotFoundException("해당 스터디룸에 가입되어 있지 않습니다.")
        );

        if (userStudyroom.isDeleted()){
            throw new UserStudyroomNotFoundException("해당 스터디룸에 가입되어 있지 않습니다.");
        }


        LocalTime currentTime = LocalTime.now();
        int hour = currentTime.getHour();
        long now = UnixTimeUtil.getCurrentUnixTime();
        log.debug("now : "+ now);
        int dayBefore = (hour < 4) ? 1 : 0;
        long[] days = getStartEndOfPeriod(now, ZoneId.of("Asia/Seoul"), dayBefore);
        for (long day : days) {
            log.debug("days : " + day );
        }
        log.debug("date :"+ days[0]);

        if(dailyLogRepository.findByUserIdAndStudyroomIdAndDateBetween(userId, studyroomId, days[0], days[1]).isEmpty()){
            DailyLog newDailyLog = new DailyLog();

            newDailyLog.setDate(days[0]);
            newDailyLog.setStudyroom(studyroom);
            newDailyLog.setUser(user);
            dailyLogRepository.save(newDailyLog);
        };
    }

    public List<DailyLogDto> totalStudyTime(Long userId, long start, long end) {
        System.out.println("여긴와???");
        List<DailyLog> dailyLogs = dailyLogRepository.findAllByUserIdAndDateBetween(
            userId, start, end);

        if (dailyLogs.isEmpty()) {
            throw new DailyLogNotFoundException("DailyLog가 존재하지 않습니다.");
        }

        System.out.println("여기도 오지?");
        log.debug("dailyLogs : "+ dailyLogs);
        for (DailyLog dailyLog : dailyLogs) {
            log.debug("dailyLog : "+ dailyLog);
        }

        ArrayList<DailyLogDto> dailyLogDtos = new ArrayList<>();
        for (DailyLog dailyLog : dailyLogs) {
            DailyLogDto dailyLogDto = DailyLogDto.from(dailyLog);
            dailyLogDtos.add(dailyLogDto);
        }

        return dailyLogDtos;
    }
}
