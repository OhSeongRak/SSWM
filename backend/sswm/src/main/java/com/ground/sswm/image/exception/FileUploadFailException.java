package com.ground.sswm.image.exception;

import com.ground.sswm.common.exception.BadRequestException;

public class FileUploadFailException  extends BadRequestException {

    public FileUploadFailException(String reason) {
        super(reason);
    }
}
