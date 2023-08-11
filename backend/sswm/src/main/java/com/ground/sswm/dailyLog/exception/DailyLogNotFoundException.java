package com.ground.sswm.dailyLog.exception;

import com.ground.sswm.common.exception.NotFoundException;

public class DailyLogNotFoundException extends NotFoundException {

    public DailyLogNotFoundException(String reason) {
        super(reason);
    }
}
