package com.ground.sswm.common.util;

import com.ground.sswm.common.annotation.ForDebug;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class UnixTimeUtil {
    @ForDebug
    public static String toSeoulTime(Instant instant ){
        LocalDateTime dateTime = LocalDateTime.ofInstant(instant, ZoneId.of("Asia/Seoul"));

       // 원하는 형식으로 날짜와 시간 표시
       DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = dateTime.format(formatter);
        return formattedDateTime;
    }

    public static Instant getCurrentUnixTime() {
        return Instant.now();
    }
    public static Instant getStartOfPeriod(Instant now){
        // 현재 날짜를 기준으로 00:00:00 UTC로 설정
        Instant dayBefore = now.minusSeconds(24 * 60 * 60);
        return dayBefore;
    }
    public static Instant getEndOfPeriod(Instant currentInstant){
        // currentTime 기준으로 00:00:00 UTC로 설정
        Instant startOfCurrentDate = currentInstant.truncatedTo(java.time.temporal.ChronoUnit.DAYS);
        // 현재 시간에서 1일을 더한 시간을 구함 (다음 날 00:00:00 UTC)
        Instant startOfNextDate = startOfCurrentDate.plus(1, java.time.temporal.ChronoUnit.DAYS);
        return startOfNextDate;
    }
}
