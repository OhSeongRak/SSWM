package com.ground.sswm.common.schedule;

import com.ground.sswm.event.domain.StudyEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisToMySQLService {
    private final RedisTemplate<String, StudyEvent> redisEventTemplate;
    public void updateDataFromRedisToMySQL(){
        //TODO : UserId_RoomId , 끝시각 Not Null
        Object dataFromRedis = fetchRedisData(1L);
        String processedData = processData(dataFromRedis);
        updateMySQLData(processedData);
    }
    private Object fetchRedisData(Long id){
        String key = String.valueOf(id);
        return redisEventTemplate.opsForValue().get(key);
    }
    private String processData(Object data) {
        //TODO: MySQL에 저장하는 형식으로 변경
        return data.toString();
    }

    private void updateMySQLData(String data) { // 변형(redis데이터) -> mysql
        // For example: mySqlRepository.updateData(data);
        System.out.println("Updating MySQL data: " + data);
    }
}
