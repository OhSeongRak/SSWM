package com.ground.sswm.auth.exception;

import com.ground.sswm.common.exception.AuthenticationException;

public class GoogleAuthenticateException extends AuthenticationException {

    public GoogleAuthenticateException(String reason) {
        super(reason);
    }
}
