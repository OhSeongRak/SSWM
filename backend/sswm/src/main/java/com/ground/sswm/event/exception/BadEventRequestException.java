package com.ground.sswm.event.exception;

import com.ground.sswm.common.exception.BadRequestException;

public class BadEventRequestException extends BadRequestException {

    public BadEventRequestException(String reason) {
        super(reason);
    }
}
