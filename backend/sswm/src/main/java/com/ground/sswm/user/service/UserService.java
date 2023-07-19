package com.ground.sswm.user.service;


import com.ground.sswm.user.dto.UserDto;

public interface UserService {

  void addUser(UserDto userReqDto);

  UserDto getUser(int userId);

  int modifyUser(UserDto userReqDto);
}
