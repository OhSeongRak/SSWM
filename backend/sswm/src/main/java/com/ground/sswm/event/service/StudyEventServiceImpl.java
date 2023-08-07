package com.ground.sswm.event.service;

import static com.ground.sswm.common.util.UnixTimeUtil.getCurrentUnixTime;
import static com.ground.sswm.common.util.UnixTimeUtil.getStartEndOfPeriod;
import static com.ground.sswm.event.util.RedisKeyUtil.keyBuilder;

import com.ground.sswm.dailyLog.domain.DailyLog;
import com.ground.sswm.dailyLog.domain.DailyLogRepository;
import com.ground.sswm.event.domain.StudyEventRepository;
import com.ground.sswm.event.domain.StudyEventStatus;
import com.ground.sswm.event.domain.StudyEventType;
import com.ground.sswm.event.dto.StudyEventDto;
import com.ground.sswm.event.exception.BadEventRequestException;
import com.ground.sswm.studyroom.domain.Studyroom;
import com.ground.sswm.studyroom.domain.StudyroomRepository;
import com.ground.sswm.studyroom.exception.StudyroomNotFoundException;
import com.ground.sswm.user.domain.User;
import com.ground.sswm.user.domain.UserRepository;
import com.ground.sswm.user.exception.UserNotFoundException;
import java.time.ZoneId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudyEventServiceImpl implements StudyEventService {

    private final StudyEventRepository studyEventRepository;
    private final DailyLogRepository dailyLogRepository;

//    private final UserRepository userRepository;
//    private final StudyroomRepository studyroomRepository;
    @Override
    public void addEventLog(Long userId, Long eventOccurTime, StudyEventDto studyEventDto, int dayBefore) {
        if (studyEventDto.getStatus() == StudyEventStatus.OFF) { // 이벤트 종료 요청
            Long prevTime = studyEventRepository.findById(keyBuilder(userId, studyEventDto.getStudyroomId(),studyEventDto.getType()));
            if (prevTime == null) {
                throw new BadEventRequestException("잘못된 이벤트 요청입니다.");
            }
            //TODO:총 공부시간 관련 확인
            // 총 공부시간 = 순수 공부시간[study_time]  + 휴식 시간[rest_time : 순수 휴식 시간 + 스트레칭 시간]

            long[] days = getStartEndOfPeriod(eventOccurTime,ZoneId.of("Asia/Seoul"),dayBefore); //
            long duration = eventOccurTime - prevTime;

            dailyLogRepository.findByUserIdAndStudyroomIdAndDateBetween(
                    userId, studyEventDto.getStudyroomId(), days[0],days[1])
                .ifPresent(dailyLog -> {
                    if (studyEventDto.getType() == StudyEventType.LIVE) {
                        dailyLog.setStudyTime( duration + dailyLog.getStudyTime());
                    } else if (studyEventDto.getType() == StudyEventType.REST) {
                        dailyLog.setRestTime(duration + dailyLog.getRestTime());
                    } else if (studyEventDto.getType() == StudyEventType.STRETCH) {
                        dailyLog.setRestTime(duration + dailyLog.getRestTime());
                    }
                        // 현재 날짜의 시작 시간으로 설정
                        dailyLog.setDate(getStartEndOfPeriod(getCurrentUnixTime(),ZoneId.of("Asia/Seoul"),dayBefore)[0]);
                    dailyLogRepository.save(dailyLog);

                });
            studyEventRepository.delete(keyBuilder(userId, studyEventDto.getStudyroomId(),studyEventDto.getType()));
        }

        else if(studyEventDto.getStatus() == StudyEventStatus.ON){ // O
            if(studyEventDto.getType() == StudyEventType.LIVE){
                // 기존 LIVE가 없어야함
                Long time = studyEventRepository.findById(keyBuilder(userId, studyEventDto.getStudyroomId(),StudyEventType.LIVE));
                if(time!=null){return;}
            }
            if(studyEventDto.getType()==StudyEventType.STRETCH){
                // LIVE 가 있어야하고, STRETCH가 없어야 하고, REST가 없어야 함
                Long prevLiveTime = studyEventRepository.findById(keyBuilder(userId, studyEventDto.getStudyroomId(),StudyEventType.LIVE));
                Long prevStretchTime = studyEventRepository.findById(keyBuilder(userId, studyEventDto.getStudyroomId(),StudyEventType.STRETCH));
                Long prevRestTime = studyEventRepository.findById(keyBuilder(userId, studyEventDto.getStudyroomId(),StudyEventType.REST));
                if(prevLiveTime==null || prevStretchTime!=null || prevRestTime!=null){throw new BadEventRequestException("잘못된 요청입니다");}
            }
            if(studyEventDto.getType()==StudyEventType.REST){
                // LIVE가 있어야 하고, REST가 없어야 하고, STRETCH가 없어야 함
                Long prevLiveTime = studyEventRepository.findById(keyBuilder(userId, studyEventDto.getStudyroomId(),StudyEventType.LIVE));
                Long prevStretchTime = studyEventRepository.findById(keyBuilder(userId, studyEventDto.getStudyroomId(),StudyEventType.STRETCH));
                Long prevRestTime = studyEventRepository.findById(keyBuilder(userId, studyEventDto.getStudyroomId(),StudyEventType.REST));
                if(prevLiveTime==null || prevStretchTime!=null || prevRestTime!=null){throw new BadEventRequestException("잘못된 요청입니다");}
            }
            studyEventRepository.save(keyBuilder(userId, studyEventDto.getStudyroomId(),studyEventDto.getType()), eventOccurTime);
        }
    }


}
