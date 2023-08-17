package com.ground.sswm.event.service;

import static com.ground.sswm.common.util.UnixTimeUtil.getCurrentUnixTime;
import static com.ground.sswm.common.util.UnixTimeUtil.getStartEndOfPeriod;
import static com.ground.sswm.event.util.RedisKeyUtil.keyBuilder;

import com.ground.sswm.dailyLog.repository.DailyLogRepository;
import com.ground.sswm.event.domain.StudyEventStatus;
import com.ground.sswm.event.domain.StudyEventType;
import com.ground.sswm.event.domain.dto.StudyEventDto;
import com.ground.sswm.event.exception.BadEventRequestException;
import com.ground.sswm.event.repository.StudyEventRepository;
import com.ground.sswm.studyroom.model.Studyroom;
import com.ground.sswm.studyroom.repository.StudyroomRepository;
import com.ground.sswm.userStudyroom.model.UserStudyroom;
import com.ground.sswm.userStudyroom.repository.UserStudyroomRepository;
import java.time.ZoneId;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StudyEventServiceImpl implements StudyEventService {

    private final StudyEventRepository studyEventRepository;
    private final DailyLogRepository dailyLogRepository;
    private final StudyroomRepository studyroomRepository;
    private final UserStudyroomRepository userStudyroomRepository;

    @Override
    public void addEventLog(Long userId, Long eventOccurTime, StudyEventDto studyEventDto,
        int dayBefore) {
        Studyroom studyroom = studyroomRepository.findById(studyEventDto.getStudyroomId()).get();
        long maxRestTime = studyroom.getMaxRestTime();
        System.out.println("maxRestTime = " + maxRestTime);

        if (studyEventDto.getStatus() == StudyEventStatus.OFF) { // 이벤트 종료 요청
            Long prevTime = studyEventRepository.findById(
                keyBuilder(userId, studyEventDto.getStudyroomId(), studyEventDto.getType()));
            if (prevTime == null) {
                throw new BadEventRequestException("잘못된 이벤트 요청입니다.");
            }
            //TODO:총 공부시간 관련 확인
            // 총 공부시간 = 순수 공부시간[study_time]  + 휴식 시간[rest_time : 순수 휴식 시간 + 스트레칭 시간]

            long[] days = getStartEndOfPeriod(eventOccurTime, ZoneId.of("Asia/Seoul"),
                dayBefore); //
            long duration = eventOccurTime - prevTime;

            dailyLogRepository.findByUserIdAndStudyroomIdAndDateBetween(
                    userId, studyEventDto.getStudyroomId(), days[0], days[1])
                .ifPresent(dailyLog -> {
                    if (studyEventDto.getType() == StudyEventType.STUDY) {
                        dailyLog.setStudyTime(duration + dailyLog.getStudyTime());
                    } else if (studyEventDto.getType() == StudyEventType.REST) {
                        dailyLog.setRestTime(Long.min(maxRestTime, duration + dailyLog.getRestTime()));
                    } else if (studyEventDto.getType() == StudyEventType.STRETCH) {
                        dailyLog.setRestTime(Long.min(maxRestTime, duration + dailyLog.getRestTime()));
                    }
                    // 현재 날짜의 시작 시간으로 설정
                    dailyLog.setDate(
                        getStartEndOfPeriod(getCurrentUnixTime(), ZoneId.of("Asia/Seoul"),
                            dayBefore)[0]);
                    dailyLogRepository.save(dailyLog);

                });
            studyEventRepository.delete(
                keyBuilder(userId, studyEventDto.getStudyroomId(), studyEventDto.getType()));
        } else if (studyEventDto.getStatus() == StudyEventStatus.ON) { // O
            if (studyEventDto.getType() == StudyEventType.STUDY) {
                // 기존 LIVE가 없어야함
                Long time = studyEventRepository.findById(
                    keyBuilder(userId, studyEventDto.getStudyroomId(), StudyEventType.STUDY));
                if (time != null) {
                    return;
                }
            }
            if (studyEventDto.getType() == StudyEventType.STRETCH) {
                // LIVE 가 있어야하고, STRETCH가 없어야 하고, REST가 없어야 함
                Long prevLiveTime = studyEventRepository.findById(
                    keyBuilder(userId, studyEventDto.getStudyroomId(), StudyEventType.STUDY));
                Long prevStretchTime = studyEventRepository.findById(
                    keyBuilder(userId, studyEventDto.getStudyroomId(), StudyEventType.STRETCH));
                Long prevRestTime = studyEventRepository.findById(
                    keyBuilder(userId, studyEventDto.getStudyroomId(), StudyEventType.REST));
                if (prevLiveTime == null || prevStretchTime != null || prevRestTime != null) {
                    throw new BadEventRequestException("잘못된 요청입니다");
                }
            }
            if (studyEventDto.getType() == StudyEventType.REST) {
                // LIVE가 있어야 하고, REST가 없어야 하고, STRETCH가 없어야 함
                Long prevLiveTime = studyEventRepository.findById(
                    keyBuilder(userId, studyEventDto.getStudyroomId(), StudyEventType.STUDY));
                Long prevStretchTime = studyEventRepository.findById(
                    keyBuilder(userId, studyEventDto.getStudyroomId(), StudyEventType.STRETCH));
                Long prevRestTime = studyEventRepository.findById(
                    keyBuilder(userId, studyEventDto.getStudyroomId(), StudyEventType.REST));
                if (prevLiveTime == null || prevStretchTime != null || prevRestTime != null) {
                    throw new BadEventRequestException("잘못된 요청입니다");
                }
            }
            studyEventRepository.save(
                keyBuilder(userId, studyEventDto.getStudyroomId(), studyEventDto.getType()),
                eventOccurTime);
        }
    }

    @Override
    public boolean checkInLive(Long userId) {
        return studyEventRepository.existsByUserId(userId);
    }

    @Override
    @Transactional
    public void delete(Long userId) {
        List<UserStudyroom> userStudyrooms = userStudyroomRepository.findAllByUserIdAndIsDeleted(userId, false);
        for (UserStudyroom userStudyroom : userStudyrooms) {
            studyEventRepository.delete(userId + "_" + userStudyroom.getStudyroom().getId() + "_STUDY");
            studyEventRepository.delete(userId + "_" + userStudyroom.getStudyroom().getId() + "_REST");
        }
    }
}
