package com.ground.sswm.common.util;

import static com.ground.sswm.common.util.UnixTimeUtil.getCurrentUnixTime;
import static com.ground.sswm.common.util.UnixTimeUtil.getStartOfPeriod;
import static com.ground.sswm.common.util.UnixTimeUtil.toSeoulTime;
import static org.assertj.core.api.Assertions.assertThat;

import java.time.Instant;
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
        System.out.println(toSeoulTime(getStartOfPeriod(now)));
        assertThat(toSeoulTime(getStartOfPeriod(now))).contains("2023-08-01");
    }
}