package com.ground.sswm.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

@ResponseStatus(HttpStatus.NOT_FOUND)
public abstract class NotFoundException extends ResponseStatusException {
    public NotFoundException(HttpStatus status, String reason) {
        super(status, reason);
    }
}
