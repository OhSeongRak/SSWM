package com.ground.sswm.auth.model;

import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@Getter
@NoArgsConstructor
public class Auth {

    @Id
    private Long userId;//unique
    private String refreshToken;

    @Builder
    public Auth(Long userId, String refreshToken) {
        this.userId = userId;
        this.refreshToken = refreshToken;
    }
}
