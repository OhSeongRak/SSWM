package com.ground.sswm.auth.exception;

import com.ground.sswm.common.exception.ForbiddenException;

public class InvalidTokenException extends ForbiddenException {
    public InvalidTokenException(String reason) {
        super(reason);
    }
}
