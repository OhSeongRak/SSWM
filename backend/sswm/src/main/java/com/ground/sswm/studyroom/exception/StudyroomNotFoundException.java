package com.ground.sswm.studyroom.exception;

import com.ground.sswm.common.exception.NotFoundException;

public class StudyroomNotFoundException extends NotFoundException {

    public StudyroomNotFoundException(String reason) {
        super(reason);
    }
}
