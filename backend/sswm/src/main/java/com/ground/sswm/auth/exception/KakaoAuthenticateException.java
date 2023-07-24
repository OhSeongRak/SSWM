package com.ground.sswm.auth.exception;

import com.ground.sswm.common.exception.AuthenticationException;

public class KakaoAuthenticateException extends AuthenticationException {

    public KakaoAuthenticateException(String reason) {
        super(reason);
    }
}
