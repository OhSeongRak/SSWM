package com.ground.sswm.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class ResponseDto<T> {
    private int code;
    private String message;
    private T result;
}
