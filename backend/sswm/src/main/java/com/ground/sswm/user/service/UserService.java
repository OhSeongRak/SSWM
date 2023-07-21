package com.ground.sswm.user.service;


import com.ground.sswm.auth.oauth.OAuthUserInfo;
import com.ground.sswm.user.domain.User;
import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.user.dto.UserResDto;
import java.util.List;

public interface
UserService {

  void addUser(UserDto userReqDto);

  UserResDto getUser(Long userId);

  void modifyUser(Long userId, UserDto userReqDto);

  List<UserDto> getAllUser();

  void delete(Long userId);

    User getUserByProviderId(String provider, String providerId);

  User addOAuthUser(OAuthUserInfo oauthUser);
}
