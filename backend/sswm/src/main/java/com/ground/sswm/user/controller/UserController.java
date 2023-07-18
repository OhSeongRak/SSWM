package com.ground.sswm.user.controller;


import com.ground.sswm.common.dto.ResponseDto;
import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
  private UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }
  @PostMapping
  public ResponseEntity<ResponseDto> addUser(@RequestBody UserDto userDto){
    userService.add(userDto);
    return new ResponseEntity<>(new ResponseDto(200, "유저 (" + userDto + ") 생성 완료", null), HttpStatus.OK);
  }
}
