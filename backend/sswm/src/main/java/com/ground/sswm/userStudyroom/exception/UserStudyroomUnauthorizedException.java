package com.ground.sswm.userStudyroom.exception;


import com.ground.sswm.common.exception.UnauthorizedException;

public class UserStudyroomUnauthorizedException extends UnauthorizedException {

    public UserStudyroomUnauthorizedException(String reason) {
        super(reason);
    }
}
