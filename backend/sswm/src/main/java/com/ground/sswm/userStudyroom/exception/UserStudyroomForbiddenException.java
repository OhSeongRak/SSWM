package com.ground.sswm.userStudyroom.exception;


import com.ground.sswm.common.exception.ForbiddenException;

public class UserStudyroomForbiddenException extends ForbiddenException {

    public UserStudyroomForbiddenException(String reason) {
        super(reason);
    }
}
