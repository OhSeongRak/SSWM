package com.ground.sswm.event.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class StudyEventRepository { // Redis
    private static final long EXPIRATION_TIME_SECONDS = 1000 * 60 * 60 * 1;
    private final RedisTemplate<String, StudyEvent> redisEventTemplate;

    public void save(StudyEvent studyEvent){
        // 입장 (userId, 입장, null)
        // 여러 이벤트
        // 퇴장 (userId, 입장, 퇴장)
    }

}
