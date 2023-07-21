package com.ground.sswm.userStudyroom.controller;


import com.ground.sswm.auth.service.AuthService;
import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.userStudyroom.domain.UserStudyroomRepository;
import com.ground.sswm.userStudyroom.dto.OnAirResDto;
import com.ground.sswm.userStudyroom.dto.UserStudyTimeResDto;
import com.ground.sswm.userStudyroom.dto.UserStudyroomReqDto;
import com.ground.sswm.userStudyroom.service.UserStudyroomService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/studyrooms")
public class UserStudyroomController {
  private final UserStudyroomService userStudyroomService;
  private final AuthService authService;
  @PostMapping("/{studyroomId}/join")
  public ResponseEntity<?> join(@RequestBody UserStudyroomReqDto userStudyroomReqDto, @PathVariable Long studyroomId){
    //Map<String, Object> headerToken = authService.getClaimsFromToken(token);
    //Integer userId = (Integer)headerToken.get("id");
    userStudyroomService.join(2L, studyroomId, userStudyroomReqDto);
    return new ResponseEntity<>("", HttpStatus.OK);
  }

  @PutMapping("/{studyroomId}/leave")
  public ResponseEntity<?> leave(@RequestHeader("Authorization") String token, @PathVariable Long studyroomId){
    Map<String, Object> headerToken = authService.getClaimsFromToken(token);
    Long userId = (Long)headerToken.get("id");
    userStudyroomService.leave(userId, studyroomId);
    return new ResponseEntity<>("", HttpStatus.OK);
  }

  @GetMapping("/{studyroomId}/search-user")
  public ResponseEntity<?> searchUser(@RequestHeader("Authorization") String token, @PathVariable Long studyroomId){
    Map<String, Object> headerToken = authService.getClaimsFromToken(token);
    Long userId = (Long)headerToken.get("id");
    OnAirResDto onAirResDto = userStudyroomService.searchUser(userId, studyroomId);

    //name, image, isInLive return
    return new ResponseEntity<OnAirResDto>(onAirResDto, HttpStatus.OK);
  }

  @PutMapping("/{studyroomId}/ban")
  public ResponseEntity<?> ban(@RequestHeader("Authorization") String token, @PathVariable Integer studyroomId, @RequestBody UserDto userDto){
    Map<String, Object> headerToken = authService.getClaimsFromToken(token);
    Integer userId = (Integer)headerToken.get("id");
//    userStudyroomService.ban(userId, userDto.getId(), studyroomId);
    return new ResponseEntity<>("", HttpStatus.OK);
  }

  @PutMapping("/{studyroomId}/pass")
  public ResponseEntity<?> pass(@RequestHeader("Authorization") String token, @PathVariable Integer studyroomId, @RequestBody UserDto userDto){
    Map<String, Object> headerToken = authService.getClaimsFromToken(token);
    Integer userId = (Integer)headerToken.get("id");
//    userStudyroomService.pass(userId, userDto.getId(), studyroomId);
    return new ResponseEntity<>("", HttpStatus.OK);
  }


  @GetMapping("/{studyroomId}/daily-study")
  public ResponseEntity<List<UserStudyTimeResDto>> searchDailyStudy(@RequestHeader("Authorization") String token, @PathVariable Long studyroomId) {

    List<UserStudyTimeResDto> users = userStudyroomService.searchDailyStudy(studyroomId);
    return new ResponseEntity<List<UserStudyTimeResDto>>(users, HttpStatus.OK);
  }

  @GetMapping("/{studyroomId}/daily-attend")

  public ResponseEntity<List<UserDto>> searchDailyAttend(@RequestHeader("Authorization") String token, @PathVariable Long studyroomId) {
    Map<String, Object> headerToken = authService.getClaimsFromToken(token);
    Long userId = (Long)headerToken.get("id");
    List<UserDto> users = userStudyroomService.searchDailyAttend(userId, studyroomId);
    return new ResponseEntity<List<UserDto>>(users, HttpStatus.OK);
  }
}
