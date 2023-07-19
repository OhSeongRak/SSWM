package com.ground.sswm.user.domain;

import com.ground.sswm.user.dto.UserDto;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nickname;
    private String email;
    private String provider;
    private String providerId;
    private Boolean isAdmin;
    private String image;
    private Integer createdAt;
    private Integer modifiedAt;

    @Builder
    public User(Integer id, String nickname, String email, String provider, String providerId,
        boolean isAdmin, String image, Integer createdAt, Integer modifiedAt) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.provider = provider;
        this.providerId = providerId;
        this.isAdmin = isAdmin;
        this.image = image;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }

    public static User from(UserDto userReqDto) {
        return User.builder()
            .nickname(userReqDto.getNickname())
            .image(userReqDto.getImage())
            .build();
    }
}
