package com.ground.sswm.common.util;

import com.ground.sswm.common.annotation.ForDebug;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class UnixTimeUtil {
    @ForDebug
    public static String toSeoulTime(long unixTime ){
        Instant instant = Instant.ofEpochSecond(unixTime);
        LocalDateTime dateTime = LocalDateTime.ofInstant(instant, ZoneId.of("Asia/Seoul"));

        // 원하는 형식으로 날짜와 시간 표시
       DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = dateTime.format(formatter);
        return formattedDateTime;
    }

    public static int getCurrentUnixTime() {
        long currentTimeMillis = System.currentTimeMillis();
        return (int) (currentTimeMillis / 1000L);
    }
    public static int getStartOfPeriod(){
        Instant currentInstant = Instant.now();
        // 현재 날짜를 기준으로 00:00:00 UTC로 설정
        Instant startOfCurrentDate = currentInstant.truncatedTo(java.time.temporal.ChronoUnit.DAYS);
        // 현재 시간에서 1일을 뺸 시간을 구함 (전 날 00:00:00 UTC)
        Instant startOfPrevDate = startOfCurrentDate.minus(1, java.time.temporal.ChronoUnit.DAYS);
        long unixTimestamp = startOfPrevDate.getEpochSecond();
        return (int) (unixTimestamp / 1000L);
    }
    public static int getEndOfPeriod(int currentTime){
        // currentTime 기준으로 00:00:00 UTC로 설정
        Instant currentInstant = Instant.ofEpochSecond(currentTime);
        Instant startOfCurrentDate = currentInstant.truncatedTo(java.time.temporal.ChronoUnit.DAYS);
        // 현재 시간에서 1일을 더한 시간을 구함 (다음 날 00:00:00 UTC)
        Instant startOfNextDate = startOfCurrentDate.plus(1, java.time.temporal.ChronoUnit.DAYS);
        long unixTimestamp = startOfNextDate.getEpochSecond();
        return (int) (unixTimestamp / 1000L);
    }
}
