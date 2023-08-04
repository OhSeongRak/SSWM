package com.ground.sswm.event.util;

import com.ground.sswm.event.domain.StudyEventType;
import lombok.Getter;

public class RedisKeyUtil {
    public static String keyBuilder(Long userId, Long studyroomId, StudyEventType type) {
        return userId + "_" + studyroomId+ "_" + type;
    }
    public static EventKeyDto keySpliter(String key){
        String[] keyData = key.split("_");
        return new EventKeyDto(Long.parseLong(keyData[0]),Long.parseLong(keyData[1]),keyData[2]);
    }
    @Getter
    public static class EventKeyDto {
        private Long userId;
        private Long studyroomId;
        private StudyEventType type;

        public EventKeyDto(long userId, long studyroomId, String type) {
            this.userId = userId;
            this.studyroomId = studyroomId;
            this.type = StudyEventType.valueOf(type);
        }
    }
}
