package com.ground.sswm.event.service;

import com.ground.sswm.common.util.UnixTimeUtil;
import com.ground.sswm.dailyLog.domain.DailyLog;
import com.ground.sswm.dailyLog.domain.DailyLogRepository;
import com.ground.sswm.event.domain.StudyEventRepository;
import com.ground.sswm.event.domain.StudyEventStatus;
import com.ground.sswm.event.domain.StudyEventType;
import com.ground.sswm.event.dto.StudyEventDto;
import com.ground.sswm.event.exception.BadEventRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudyEventServiceImpl implements StudyEventService {

    private final StudyEventRepository studyEventRepository;
    private final DailyLogRepository dailyLogRepository;
    @Override
    public void addEventLog(Long userId, Long time, StudyEventDto studyEventDto) {
        if (studyEventDto.getStatus() == StudyEventStatus.OFF) { // 이벤트 종료 요청
            Long prevTime = studyEventRepository.findById(keyBuilder(userId, studyEventDto));
            if(prevTime == null){throw new BadEventRequestException("잘못된 이벤트 요청입니다.");}
            dailyLogRepository.findByUserIdAndStudyroomIdAndDate(
                userId,studyEventDto.getStudyroomId(), UnixTimeUtil.getCurrentUnixTime())
                .ifPresent(dailyLog -> {
                    if(studyEventDto.getType() == StudyEventType.LIVE){
                        dailyLog.setStudyTime(dailyLog.getStudyTime());
                    }else if(studyEventDto.getType()==StudyEventType.REST){
                        dailyLog.setRestTime(dailyLog.getRestTime());
                    }else if(studyEventDto.getType()==StudyEventType.STRETCH){
                        dailyLog.setStretchScore(dailyLog.getStretchScore());
                    }

                    dailyLogRepository.save(dailyLog);});

        }else{

        }

        studyEventRepository.save(keyBuilder(userId, studyEventDto), time);
    }

    private String keyBuilder(Long userId, StudyEventDto studyEventDto) {
        return userId + "_" + studyEventDto.getStudyroomId() + "_" + studyEventDto.getType();
    }
}
