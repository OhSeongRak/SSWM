package com.ground.sswm.common.util;

import com.ground.sswm.common.annotation.ForDebug;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class UnixTimeUtil {
    @ForDebug
    public static String toSeoulTime(long time ){
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
    public static long getStartOfPeriod(long time){
        Instant now = Instant.ofEpochSecond(time);
        // 현재 날짜를 기준으로 00:00:00 UTC로 설정
        Instant dayBefore = now.minusSeconds(24 * 60 * 60);
        return dayBefore.getEpochSecond();
    }
    public static long getEndOfPeriod(long time){
        Instant currentInstant = Instant.ofEpochSecond(time);
        // currentTime 기준으로 00:00:00 UTC로 설정
        Instant startOfCurrentDate = currentInstant.truncatedTo(java.time.temporal.ChronoUnit.DAYS);
        // 현재 시간에서 1일을 더한 시간을 구함 (다음 날 00:00:00 UTC)
        Instant startOfNextDate = startOfCurrentDate.plus(1, java.time.temporal.ChronoUnit.DAYS);
        return startOfNextDate.getEpochSecond();
    }
}
