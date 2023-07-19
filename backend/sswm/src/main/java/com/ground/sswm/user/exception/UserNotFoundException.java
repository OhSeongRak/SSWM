package com.ground.sswm.user.exception;

import com.ground.sswm.common.exception.NotFoundException;

public class UserNotFoundException extends NotFoundException {

    public UserNotFoundException(String reason) {
        super(reason);
    }
}
