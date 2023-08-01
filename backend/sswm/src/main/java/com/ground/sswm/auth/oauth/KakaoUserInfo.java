package com.ground.sswm.auth.oauth;

import com.ground.sswm.auth.dto.OAuthUserInfoDto;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class KakaoUserInfo implements OAuthUserInfo {

    private final OAuthUserInfoDto oAuthUserInfoDto;

    @Override
    public String getProviderId() {
        return oAuthUserInfoDto.getProviderId();
    }

    @Override
    public String getProvider() {
        return OAuthProvider.KAKAO.getProvider();
    }

    @Override
    public String getEmail() {
        return oAuthUserInfoDto.getEmail();
    }

    @Override
    public String getName() {
        return oAuthUserInfoDto.getName();
    }

    @Override
    public String getProfileImg(){
        return oAuthUserInfoDto.getProfileImg();
    }
    @Override
    public String getNickname(){
        return oAuthUserInfoDto.getNickname();
    }
}
