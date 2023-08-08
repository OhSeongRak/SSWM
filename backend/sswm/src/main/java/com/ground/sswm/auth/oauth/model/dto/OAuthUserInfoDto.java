package com.ground.sswm.auth.oauth.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OAuthUserInfoDto {

    public String providerId;//socialId
    public String name;
    public String email;
    public String nickname;
    public String profileImg;
}
