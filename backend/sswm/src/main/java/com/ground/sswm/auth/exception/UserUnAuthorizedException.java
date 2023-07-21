package com.ground.sswm.auth.exception;

import com.ground.sswm.common.exception.UnauthorizedException;

public class UserUnAuthorizedException extends UnauthorizedException {

    public UserUnAuthorizedException(String reason) {
        super(reason);
    }
}
