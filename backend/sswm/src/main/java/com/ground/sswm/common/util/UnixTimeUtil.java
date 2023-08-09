package com.ground.sswm.common.util;

import com.ground.sswm.common.config.annotation.ForDebug;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class UnixTimeUtil {

    @ForDebug
    public static String toSeoulTime(long time) {
        Instant instant = Instant.ofEpochSecond(time);
        LocalDateTime dateTime = LocalDateTime.ofInstant(instant, ZoneId.of("Asia/Seoul"));

        // 원하는 형식으로 날짜와 시간 표시
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = dateTime.format(formatter);
        return formattedDateTime;
    }

    public static long getCurrentUnixTime() { // 사용해서 현재시각 DB에 저장
        return Instant.now().getEpochSecond();
    }

    public static long[] getStartEndOfPeriod(long time, ZoneId zoneId, int dayBefore) {
        Instant now = Instant.ofEpochSecond(time);
        ZonedDateTime zonedDateTime = now.atZone(zoneId);

        // 현재 날짜를 기준으로 00:00:00 Asia/Seoul로 설정
        ZonedDateTime startOfCurrentDate = zonedDateTime.toLocalDate().atStartOfDay(zoneId);
        ZonedDateTime oneDayBefore = startOfCurrentDate.minusDays(dayBefore);
        Instant dayBeforeInstant = oneDayBefore.toInstant();

        ZonedDateTime oneDayAfter = startOfCurrentDate.plusDays(1);
        Instant dayAfterInstant = oneDayAfter.toInstant();
        return new long[]{dayBeforeInstant.getEpochSecond(), dayAfterInstant.getEpochSecond()};
    }

}
