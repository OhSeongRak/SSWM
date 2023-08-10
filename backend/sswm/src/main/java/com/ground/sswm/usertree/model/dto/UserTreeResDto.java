package com.ground.sswm.usertree.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class UserTreeResDto {
    private UserTreeDto userTreeDto;
    private String image;
    private String name;
    private boolean current;
}
