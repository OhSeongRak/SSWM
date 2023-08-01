package com.ground.sswm.common.schedule;

import com.ground.sswm.dailyLog.domain.DailyLogRepository;
import com.ground.sswm.userStudyroom.domain.UserStudyroomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MySQLSelfService {
    private final DailyLogRepository dailyLogRepository;
    private final UserStudyroomRepository userStudyroomRepository;

    public void performDailyAccumulate(){
        // TODO : DailyLog에서 (studyTime, restTime, stretchScore) 읽어오기
        // dayilLogRepository.findByDate();
        // 날짜 확인해서 올바른 날짜인지
        // TODO : UserStudyroom (totalStudy, totalRest)에 누적업데이트하기
    }
}
