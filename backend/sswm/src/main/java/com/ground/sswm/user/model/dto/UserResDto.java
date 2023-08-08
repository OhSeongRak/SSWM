package com.ground.sswm.user.model.dto;

import com.ground.sswm.user.model.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResDto {

    private String name;
    private String nickname;
    private String email;
    private String image;

    @Builder
    public UserResDto(String name, String nickname, String email, String image) {
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.image = image;
    }

    public static UserResDto from(User user) {
        return UserResDto.builder()
            .name(user.getName())
            .nickname(user.getNickname())
            .email(user.getEmail())
            .image(user.getImage())
            .build();
    }
}
