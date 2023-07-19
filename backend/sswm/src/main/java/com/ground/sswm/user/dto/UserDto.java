package com.ground.sswm.user.dto;

import com.ground.sswm.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class UserDto {
    private Integer id;
    private String nickname;
    private String email;
    private String image;

    @Builder
    public UserDto(Integer id, String nickname, String email, String image) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.image = image;
    }

    public static UserDto from(User user) {
        return UserDto.builder()
            .id(user.getId())
            .nickname(user.getNickname())
            .email(user.getEmail())
            .image(user.getImage())
            .build();
    }
}
