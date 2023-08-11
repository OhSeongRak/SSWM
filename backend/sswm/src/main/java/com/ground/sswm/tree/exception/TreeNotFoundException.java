package com.ground.sswm.tree.exception;

import com.ground.sswm.common.exception.NotFoundException;

public class TreeNotFoundException extends NotFoundException {

    public TreeNotFoundException(String reason) {
        super(reason);
    }
}
