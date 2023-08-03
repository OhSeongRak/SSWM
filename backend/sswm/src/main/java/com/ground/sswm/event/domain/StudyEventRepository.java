package com.ground.sswm.event.domain;

import com.ground.sswm.auth.domain.Auth;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class StudyEventRepository { // Redis
    private final RedisTemplate<String, Long> redisEventTemplate;

    public void save(String key, Long  time){
        redisEventTemplate.opsForValue().set(key, time);
    }
    public Long findById(String key){
        // Use userId as the Redis key
        return redisEventTemplate.opsForValue().get(key);
    }

    public void delete(String key) {
         redisEventTemplate.delete(key);
    }
}
