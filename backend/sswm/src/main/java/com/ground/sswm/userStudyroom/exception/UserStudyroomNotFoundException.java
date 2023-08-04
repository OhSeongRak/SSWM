package com.ground.sswm.userStudyroom.exception;

import com.ground.sswm.common.exception.NotFoundException;
public class UserStudyroomNotFoundException extends NotFoundException {
    public UserStudyroomNotFoundException(String reason) {
            super(reason);
        }
}
