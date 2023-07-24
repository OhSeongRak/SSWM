package com.ground.sswm.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;


public abstract class SswmApiException extends ResponseStatusException {
    public SswmApiException(HttpStatus status, String reason) {
        super(status, reason);
    }
}
