package com.ground.sswm.userStudyroom.controller;


import com.ground.sswm.auth.service.AuthService;

import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.userStudyroom.dto.OnAirResDto;
import com.ground.sswm.userStudyroom.dto.UserAttendResDto;
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
    //유저가 스터디룸에 가입함
    public ResponseEntity<String> join(/*@RequestHeader("Authorization") String token,*/@RequestHeader("userId") Long userId, @PathVariable Long studyroomId) {

        //토큰에서 현재 유저 아이디 가져옴
        //Map<String, Object> headerToken = authService.getClaimsFromToken(token);
        //Long userId = (Long) headerToken.get("id");

        //service에 등록 요청
        String result = userStudyroomService.joinUser(userId, studyroomId);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping("/{studyroomId}/leave")
    //유저가 본인 의지로 룸을 떠남
    public ResponseEntity<?> leave(@RequestHeader("Authorization") String token,
        @PathVariable Long studyroomId) {

        //토큰에서 현재 유저 아이디 가져옴
        Map<String, Object> headerToken = authService.getClaimsFromToken(token);
        Long userId = (Long) headerToken.get("id");

        //service에게 유저 탈퇴 요청
        userStudyroomService.leaveUser(userId, studyroomId);

        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @GetMapping("/{studyroomId}/search-user")
    //스터디룸에서 유저목록 조회
    public ResponseEntity<List<OnAirResDto>> searchUser(
        @RequestHeader("Authorization") String token, @PathVariable Long studyroomId) {
        //토큰에서 현재 유저 아이디 가져옴
        Map<String, Object> headerToken = authService.getClaimsFromToken(token);
        Long userId = (Long) headerToken.get("id");

        //db에서 유저를 가져와서 리스트로 저장
        List<OnAirResDto> onAirResDtos = userStudyroomService.searchUser(userId, studyroomId);

        //name, image, isInLive return
        return new ResponseEntity<List<OnAirResDto>>(onAirResDtos, HttpStatus.OK);
    }

    @PutMapping("/{studyroomId}/ban")
    //스터디룸에서 유저 차단
    public ResponseEntity<?> ban(@RequestHeader("Authorization") String token,
        @PathVariable Long studyroomId, @RequestBody UserDto userDto) {

        //토큰에서 현재 유저 아이디 가져옴
        Map<String, Object> headerToken = authService.getClaimsFromToken(token);
        Long userId = (Long) headerToken.get("id");

        //****service에게 유저 벤 요청(추후 userDto새로 만들고 그 밑 줄 삭제)****
        //userStudyroomService.banUser(userId, userDto.getId(), studyroomId);
        userStudyroomService.banUser(userId, 1L, studyroomId);

        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @PutMapping("/{studyroomId}/pass")
    //스터디룸에서 방장 권한 넘김
    public ResponseEntity<?> pass(@RequestHeader("Authorization") String token,
        @PathVariable Long studyroomId, @RequestBody UserDto userDto) {
        //토큰에서 유저정보 받아옴
        Map<String, Object> headerToken = authService.getClaimsFromToken(token);
        Long userId = (Long) headerToken.get("id");

        //****유저 서비스에 권한 넘기기 호출****
        //userStudyroomService.passRole(userId, userDto.getId(), studyroomId);
        userStudyroomService.passRole(userId, 1L, studyroomId);

        return new ResponseEntity<>("", HttpStatus.OK);
    }


    @GetMapping("/{studyroomId}/daily-study")
    //스터디룸에서 공부량 top3 조회
    public ResponseEntity<List<UserStudyTimeResDto>> searchDailyStudy(
        /*@RequestHeader("Authorization") String token,*/ @PathVariable Long studyroomId) {

        List<UserStudyTimeResDto> users = userStudyroomService.searchDailyStudy(studyroomId);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{studyroomId}/daily-attend")
    //스터디룸에서 출석률 top3 whghl
    public ResponseEntity<List<UserAttendResDto>> searchDailyAttend(
        /*@RequestHeader("Authorization") String token,*/ @PathVariable Long studyroomId) {

        List<UserAttendResDto> users = userStudyroomService.searchDailyAttend(studyroomId, 123, 126);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
