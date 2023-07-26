package com.ground.sswm.user.exception;

import com.ground.sswm.common.exception.BadRequestException;

public class NicknameAlreadyExistException extends BadRequestException {

    public NicknameAlreadyExistException(String reason) {
        super(reason);
    }
}
