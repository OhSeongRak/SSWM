package com.ground.sswm.usertree.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class UserTreeResDto {
    private float dayExp;
    private float userExp;
    private String image;
    private String name;
    private boolean current;
}
