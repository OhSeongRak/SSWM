package com.ground.sswm.common.schedule;

import static com.ground.sswm.common.util.UnixTimeUtil.getCurrentUnixTime;
import static com.ground.sswm.common.util.UnixTimeUtil.getStartEndOfPeriod;
import static com.ground.sswm.event.util.RedisKeyUtil.keySpliter;

import com.ground.sswm.common.util.UnixTimeUtil;
import com.ground.sswm.dailyLog.domain.DailyLog;
import com.ground.sswm.dailyLog.domain.DailyLogRepository;
import com.ground.sswm.event.domain.StudyEventType;
import com.ground.sswm.event.util.RedisKeyUtil.EventKeyDto;
import com.ground.sswm.studyroom.domain.Studyroom;
import com.ground.sswm.studyroom.domain.StudyroomRepository;
import com.ground.sswm.studyroom.exception.StudyroomNotFoundException;
import com.ground.sswm.user.domain.User;
import com.ground.sswm.user.domain.UserRepository;
import com.ground.sswm.user.exception.UserNotFoundException;
import com.ground.sswm.userStudyroom.domain.UserStudyroom;
import com.ground.sswm.userStudyroom.domain.UserStudyroomRepository;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.stereotype.Service;
@Slf4j
@Service
@RequiredArgsConstructor
public class RedisToMySQLService {
    private final RedisTemplate<String, Long> redisEventTemplate;
    private final DailyLogRepository dailyLogRepository;

    private final UserRepository userRepository;
    private final StudyroomRepository studyroomRepository;
    public void updateDataFromRedisToMySQL(int dayBefore){
        updateMySQLDataUsingRedisData(fetchRedisKeys(), dayBefore);
    }
    public void updateDataFromRedisToMySQL4(){
        updateMySQLDataUsingRedisData4(fetchRedisKeys());
    }


    private List<String> fetchRedisKeys(){
        String pattern = "*_*_*";

        ScanOptions scanOptions = ScanOptions.scanOptions()
            .match(pattern)
            .build();

        Cursor<String> cursor = redisEventTemplate.opsForValue().getOperations()
            .scan(scanOptions);
        List<String> keys = new ArrayList<>();
        while (cursor.hasNext()) {
            String key = cursor.next();
            keys.add(key);
        }
        log.debug("[FETCH REDIS KEYS] >>"+keys.size());
        return keys;
    }

    //30분마다 현재 redis 데이터들을 토대로 mysql에 추가해주고 새로운 redis 만듬
    private void updateMySQLDataUsingRedisData(List<String> keys, int dayBefore) {
        long now = UnixTimeUtil.getCurrentUnixTime();

        //redis정보들 전부 처리
        keys.forEach(key -> {
            //각 정보에 대해
            //시작 시간 가져옴
            long startTime = redisEventTemplate.opsForValue().get(key);
            EventKeyDto dto = keySpliter(key);

            //현재 시간 기준으로 4시 이전이면 어제 00시00분, 오늘 00시00분 가져옴
            //                4시 이후이면 오늘 00시00분, 내일 00시00분 가져옴
            long[] days = getStartEndOfPeriod(now, ZoneId.of("Asia/Seoul"), dayBefore);

            //현재 시간 기준으로 몇분인지 계산
            long duration = now - startTime;

            // studyEventServiceImpl로직과 동일
            //오늘의 dailylog 가져옴
            dailyLogRepository.findByUserIdAndStudyroomIdAndDateBetween(
                    dto.getUserId(), dto.getStudyroomId(), days[0], days[1])
                .ifPresent(dailyLog -> {

                        //redis의 이벤트에 따라 분기
                        if (dto.getType() == StudyEventType.LIVE) { //이벤트가 공부이면
                            dailyLog.setStudyTime( duration + dailyLog.getStudyTime());
                        } else if (dto.getType() == StudyEventType.REST) { //이벤트가 휴식이면
                            dailyLog.setRestTime(duration + dailyLog.getRestTime());
                        } else if (dto.getType() == StudyEventType.STRETCH) { //이벤트가 스트레칭이면
                            dailyLog.setRestTime(duration + dailyLog.getRestTime());
                        }
                        dailyLogRepository.save(dailyLog);
                    });
            redisEventTemplate.opsForValue().set(key, now);
        });
        log.debug("Updating MySQL data: " + keys);
    }

    private void updateMySQLDataUsingRedisData4(List<String> keys) {

        // 접속되어있는 유저에 대해
        //    전날 dailylog에 업데이트
        //    새로운 날 dailylog생성
        //    현재 상태를 redis에 00:00으로 다시 저장

        //전날 dailylog에 업데이트
        updateMySQLDataUsingRedisData(keys, 1);
        
        
        long now = UnixTimeUtil.getCurrentUnixTime();

        //redis정보들 전부 처리
        keys.forEach(key -> {
            EventKeyDto dto = keySpliter(key);

            DailyLog dailyLog = new DailyLog();
            if (dto.getType() == StudyEventType.LIVE) {
                dailyLog.setStudyTime(0);
            } else if (dto.getType() == StudyEventType.REST) {
                dailyLog.setRestTime(0);
            } else if (dto.getType() == StudyEventType.STRETCH) {
                dailyLog.setRestTime(0);
            }
            // 현재 날짜의 시작 시간으로 설정
            dailyLog.setDate(
                getStartEndOfPeriod(getCurrentUnixTime(), ZoneId.of("Asia/Seoul"), 0)[0]);
            User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new UserNotFoundException("유저없음"));
            Studyroom studyroom = studyroomRepository.findById(dto.getStudyroomId())
                .orElseThrow(() -> new StudyroomNotFoundException("스터디룸없음"));

            dailyLog.setUser(user);
            dailyLog.setStudyroom(studyroom);

            dailyLogRepository.save(dailyLog);

            redisEventTemplate.opsForValue().set(key, now);

            log.debug("Updating MySQL data(24): " + keys);
        });
    }
}
