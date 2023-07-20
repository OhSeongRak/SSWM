package com.ground.sswm.userStudyroom.controller;


import com.ground.sswm.user.domain.User;
import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.userStudyroom.dto.OnAirResDto;
import com.ground.sswm.userStudyroom.dto.UserStudyTimeResDto;
import com.ground.sswm.userStudyroom.dto.UserStudyroomDto;
import com.ground.sswm.userStudyroom.service.UserStudyroomService;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/studyrooms")
public class UserStudyroomController {
  private final UserStudyroomService userStudyroomService;

  @PostMapping("/{studyroomId}/join")
  public ResponseEntity<?> join(@RequestHeader UserDto userDto, @RequestBody UserStudyroomDto userStudyroomDto, @PathVariable Integer studyroomId){
    userStudyroomService.join(userDto, studyroomId, userStudyroomDto);
    return new ResponseEntity<>("", HttpStatus.OK);
  }

  @PutMapping("/{studyroomId}/leave")
  public ResponseEntity<?> leave(@RequestHeader UserDto userDto, @PathVariable Integer studyroomId){
    userStudyroomService.leave(userDto, studyroomId);
    return new ResponseEntity<>("", HttpStatus.OK);
  }

  @GetMapping("/{studyroomId}/search-user")
  public ResponseEntity<?> searchUser(@RequestHeader UserDto userDto, @PathVariable Integer studyroomId){
    OnAirResDto onAirResDto = userStudyroomService.searchUser(userDto, studyroomId);

    //name, image, isInLive return
    return new ResponseEntity<OnAirResDto>(onAirResDto, HttpStatus.OK);
  }

  @PutMapping("/{studyroomId}/ban")
  public ResponseEntity<?> ban(@RequestHeader String Token, @PathVariable Integer studyroomId, @RequestBody UserDto userDto){
    //userId = Token.parse()
    //userStudyroomService.ban(userId, userDto.getId(), studyroomId);
    return new ResponseEntity<>("", HttpStatus.OK);
  }

  @PutMapping("/{studyroomId}/pass")
  public ResponseEntity<?> pass(@RequestHeader String Token, @PathVariable Integer studyroomId, @RequestBody UserDto userDto){
    //userId = Token.parse()
    //userStudyroomService.pass(userId, userDto.getId(), studyroomId);
    return new ResponseEntity<>("", HttpStatus.OK);
  }


  @GetMapping("/{studyroomId}/daily-study")
  public ResponseEntity<?> searchDailyStudy(@RequestHeader UserDto userDto, @PathVariable Integer studyroomId) {
    List<UserStudyTimeResDto> users = userStudyroomService.searchDailyStudy(studyroomId);
    return new ResponseEntity<List<UserStudyTimeResDto>>(users, HttpStatus.OK);
  }

  @GetMapping("/{studyroomId}/daily-attend")
  public ResponseEntity<?> searchDailyAttend(@RequestHeader UserDto userDto, @PathVariable Integer studyroomId) {
    List<UserDto> users = userStudyroomService.searchDailyAttend(userDto, studyroomId);
    return new ResponseEntity<List<UserDto>>(users, HttpStatus.OK);
  }
}
