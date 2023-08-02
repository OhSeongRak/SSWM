package com.ground.sswm.event.domain;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class StudyEventRepository { // Redis
    private static final long EXPIRATION_TIME_SECONDS = 1000 * 60 * 60 * 24; // 하루 보관
    private final RedisTemplate<String, StudyEvent> redisEventTemplate;

    public void save(StudyEvent studyEvent){
        //TODO: {key : userId_TYPE_STATUS}
        String key = studyEvent.getUserId()+"_"+studyEvent.getEvent()+"_"+studyEvent.getStudyEventStatus();
        redisEventTemplate.opsForValue().set(key, studyEvent, EXPIRATION_TIME_SECONDS, TimeUnit.SECONDS );
    }

}
