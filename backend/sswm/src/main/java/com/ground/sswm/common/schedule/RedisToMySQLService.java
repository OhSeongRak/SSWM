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
    public void updateDataFromRedisToMySQL(){
        //TODO : UserId_RoomId , 끝시각 Not Null
        updateMySQLDataUsingRedisData(fetchRedisKeys());
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

    private void updateMySQLDataUsingRedisData(List<String> keys) {
        // For example: mySqlRepository.updateData(data);
        long now = UnixTimeUtil.getCurrentUnixTime();
        keys.forEach(key -> {
            long startTime = redisEventTemplate.opsForValue().get(key);
            EventKeyDto dto = keySpliter(key);
            long[] days = getStartEndOfPeriod(now, ZoneId.of("Asia/Seoul"),0);
            long duration = now - startTime;
            // studyEventServiceImpl로직과 동일
            dailyLogRepository.findByUserIdAndStudyroomIdAndDateBetween(
                    dto.getUserId(), dto.getStudyroomId(), days[0],days[1])
                .ifPresentOrElse(dailyLog -> {
                        if (dto.getType() == StudyEventType.LIVE) {
                            dailyLog.setStudyTime( duration + dailyLog.getStudyTime());
                        } else if (dto.getType() == StudyEventType.REST) {
                            dailyLog.setRestTime(duration + dailyLog.getRestTime());
                        } else if (dto.getType() == StudyEventType.STRETCH) {
                            dailyLog.setRestTime(duration + dailyLog.getRestTime());
                        }
                        // 현재 날짜의 시작 시간으로 설정
                        dailyLog.setDate(getStartEndOfPeriod(getCurrentUnixTime(),ZoneId.of("Asia/Seoul"),0)[0]);
                        dailyLogRepository.save(dailyLog);
                    },
                    ()->{
                        DailyLog dailyLog = new DailyLog();
                        if (dto.getType() == StudyEventType.LIVE) {
                            dailyLog.setStudyTime(duration);
                        } else if (dto.getType() == StudyEventType.REST) {
                            dailyLog.setRestTime(duration);
                        } else if (dto.getType() == StudyEventType.STRETCH) {
                            dailyLog.setRestTime(duration);
                        }
                        // 현재 날짜의 시작 시간으로 설정
                        dailyLog.setDate(getStartEndOfPeriod(getCurrentUnixTime(),ZoneId.of("Asia/Seoul"),0)[0]);
                        User user = userRepository.findById(dto.getUserId()).orElseThrow(()-> new UserNotFoundException("유저없음"));
                        Studyroom studyroom = studyroomRepository.findById(dto.getStudyroomId()).orElseThrow(()->new StudyroomNotFoundException("스터디룸없음"));
                        dailyLog.setUser(user);
                        dailyLog.setStudyroom(studyroom);
                        dailyLogRepository.save(dailyLog);
                    });
            redisEventTemplate.opsForValue().set(key, now);
        });
        System.out.println("Updating MySQL data: " + keys);
    }

}
