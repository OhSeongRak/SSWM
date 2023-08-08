package com.ground.sswm.auth.oauth.model;

import com.ground.sswm.auth.oauth.model.dto.OAuthUserInfoDto;

public class GoogleUserInfo implements OAuthUserInfo {

    private final OAuthUserInfoDto oAuthUserInfoDto;

    public GoogleUserInfo(OAuthUserInfoDto userInitialInfo) {
        this.oAuthUserInfoDto = userInitialInfo;
    }

    @Override
    public String getProviderId() {
        return oAuthUserInfoDto.getProviderId();
    }

    @Override
    public String getProvider() {
        return OAuthProvider.GOOGLE.getProvider();
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
    public String getProfileImg() {
        return oAuthUserInfoDto.getProfileImg();
    }

    @Override
    public String getNickname() {
        return oAuthUserInfoDto.getNickname();
    }

}
