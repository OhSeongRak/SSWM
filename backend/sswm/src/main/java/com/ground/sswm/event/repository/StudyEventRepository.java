package com.ground.sswm.event.repository;

import com.ground.sswm.event.domain.StudyEventType;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.stereotype.Repository;
@Slf4j
@Repository
@RequiredArgsConstructor
public class StudyEventRepository { // Redis

    private final RedisTemplate<String, Long> redisEventTemplate;

    public void save(String key, Long time) {
        redisEventTemplate.opsForValue().set(key, time);
    }

    public Long findById(String key) {
        return redisEventTemplate.opsForValue().get(key);
    }

    public void delete(String key) {
        redisEventTemplate.delete(key);
    }

    public List<Long> findUserIdsInLive(Long studyroomId) {
        String pattern = "*_" + studyroomId + "_" + StudyEventType.STUDY;
        ScanOptions scanOptions = ScanOptions.scanOptions()
            .match(pattern) // *_{studyroomId}_LIVE
            .build();

        Cursor<String> cursor = redisEventTemplate.opsForValue().getOperations()
            .scan(scanOptions);
        List<Long> userIds = new ArrayList<>();
        while (cursor.hasNext()) {
            String key = cursor.next();
            userIds.add(Long.parseLong(key.split("_")[1]));
        }
        return userIds;

    }
}
