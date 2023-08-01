package com.ground.sswm.auth.exception;

import com.ground.sswm.common.exception.BadRequestException;

public class UserAlreadyExistException extends BadRequestException {

    public UserAlreadyExistException(String reason) {
        super(reason);
    }
}
