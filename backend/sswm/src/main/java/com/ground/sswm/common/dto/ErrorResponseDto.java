package com.ground.sswm.common.dto;

public class ErrorResponseDto extends ResponseDto<ErrorDetail> {
    public ErrorResponseDto(int code, String message, ErrorDetail result) {
        super(code, message, result);
    }
}
