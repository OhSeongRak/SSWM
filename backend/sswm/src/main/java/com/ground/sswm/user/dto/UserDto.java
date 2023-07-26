package com.ground.sswm.user.dto;

import com.ground.sswm.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class UserDto {
    private String nickname;
    private String image;

    @Builder
    public UserDto( String nickname, String email, String image) {
        this.nickname = nickname;
        this.image = image;
    }

    public static UserDto from(User user) {
        return UserDto.builder()
            .nickname(user.getNickname())
            .image(user.getImage())
            .build();
    }
}
