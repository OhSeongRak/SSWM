package com.ground.sswm.common.schedule;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ScheduledTasks {
    private final RedisToMySQLService redisToMySQLService;
    private final MySQLSelfService mySQLSelfService;
    @Scheduled(cron = "0 0/30 * * * ?") // Runs every 30 minutes
    public void updateRedisDataToMySQL() {
        redisToMySQLService.updateDataFromRedisToMySQL();
    }
    @Scheduled(cron = "0 0 4 * * ?") // Runs every 4 a.m.
    public void updateMySQLEveryDay() {
        mySQLSelfService.dailyLogToUserStudyroom();
    }
}