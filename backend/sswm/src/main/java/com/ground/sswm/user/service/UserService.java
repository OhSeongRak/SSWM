package com.ground.sswm.user.service;

import com.ground.sswm.auth.oauth.model.OAuthUserInfo;
import com.ground.sswm.user.model.User;
import com.ground.sswm.user.model.dto.UserDto;
import com.ground.sswm.user.model.dto.UserResDto;
import java.util.List;

public interface UserService {

    void addUser(UserDto userReqDto);

    UserResDto getUserResDto(Long userId);

    UserDto getUserDto(Long userId);

    List<UserDto> getAllUser();

    void delete(Long userId);

    User getUserByProviderId(String provider, String providerId);

    User addOAuthUser(OAuthUserInfo oauthUser);

    void modifyUser(Long id, String nickname, String imagePath);

    boolean exists(String nickname, Long userId);
}

