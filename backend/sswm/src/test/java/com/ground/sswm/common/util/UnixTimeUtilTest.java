package com.ground.sswm.common.util;

import static com.ground.sswm.common.util.UnixTimeUtil.getCurrentUnixTime;
import static com.ground.sswm.common.util.UnixTimeUtil.getStartEndOfPeriod;
import static com.ground.sswm.common.util.UnixTimeUtil.toSeoulTime;
import static org.assertj.core.api.Assertions.assertThat;

import java.time.ZoneId;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UnixTimeUtilTest {

    @Test
    public void instantTest() {
        System.out.println(toSeoulTime(getCurrentUnixTime()));
        assertThat(toSeoulTime(getCurrentUnixTime())).contains("2023-08-02");
    }
    @Test
    public void instantTest_startOfPeriod() {
        long now = getCurrentUnixTime();
        long[] times = getStartEndOfPeriod(now, ZoneId.of("Asia/Seoul"),0);
        System.out.println(toSeoulTime(times[0]));
        System.out.println(toSeoulTime(times[1]));

        //assertThat(toSeoulTime(getStartOfPeriod(now))).contains("2023-08-01");
    }
}