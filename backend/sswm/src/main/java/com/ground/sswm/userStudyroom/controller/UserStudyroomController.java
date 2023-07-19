package com.ground.sswm.userStudyroom.controller;


import com.ground.sswm.userStudyroom.dto.UserStudyroomDto;
import com.ground.sswm.userStudyroom.service.UserStudyroomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/studyrooms")
public class UserStudyroomController {
  private UserStudyroomService userStudyroomService;

  public UserStudyroomController(UserStudyroomService userStudyroomService) {
    this.userStudyroomService = userStudyroomService;
  }
  @PostMapping
  public ResponseEntity<?> addUser(@RequestBody UserStudyroomDto userStudyroomDto){
    userStudyroomService.add(userStudyroomDto);
    return new ResponseEntity<>("", HttpStatus.OK);
  }
}
