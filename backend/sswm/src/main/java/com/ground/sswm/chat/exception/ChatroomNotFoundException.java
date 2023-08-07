package com.ground.sswm.chat.exception;

import com.ground.sswm.common.exception.NotFoundException;

public class ChatroomNotFoundException extends NotFoundException {

    public ChatroomNotFoundException(String reason) {
        super(reason);
    }
}
