package com.ground.sswm.user.service;


import com.ground.sswm.auth.dto.OAuthUserInfo;
import com.ground.sswm.user.domain.User;
import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.user.dto.UserResDto;
import java.util.List;

public interface UserService {

  void addUser(UserDto userReqDto);

  UserResDto getUser(int userId);

  int modifyUser(int userId, UserDto userReqDto);

  List<UserDto> getAllUser();

  void delete(int userId);

    User getUserByProviderId(String provider, String providerId);

  User addOAuthUser(OAuthUserInfo oauthUser);
}
