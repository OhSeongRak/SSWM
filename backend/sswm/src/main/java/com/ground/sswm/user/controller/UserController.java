package com.ground.sswm.user.controller;


import com.ground.sswm.auth.jwt.JwtUtil;
import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.user.dto.UserResDto;
import com.ground.sswm.user.service.UserService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Deprecated
    @PostMapping
    public ResponseEntity<?> add(@RequestBody UserDto userDto) {   //FOR Test
        log.debug("[POST] /users " + userDto);
        userService.addUser(userDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @Deprecated
    @GetMapping
    public ResponseEntity<List<UserDto>> getAll() {  //FOR Test
        List<UserDto> userDtoList = userService.getAllUser();
        return new ResponseEntity<>(userDtoList, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResDto> get(@PathVariable Long userId) {
        UserResDto userResDto = userService.getUserResDto(userId);
        return new ResponseEntity<>(userResDto, HttpStatus.OK);
    }

    // 토큰의 유효성 검사는 프론트에서 하나?
    @PutMapping("/{nickname}")
    public ResponseEntity<?> modifyNickname(@RequestHeader("Authorization") String token,
        @PathVariable String nickname) {

        System.out.println("여긴오냐?");
        // 토큰을 가져오고
        Map<String, Object> claims = jwtUtil.getClaims(token);

        // 토큰에서 유저 아이디를 가져온다
        int userId = (int) claims.get("id");
        long id = (long) userId;

        for (String keySet : claims.keySet()) {
            System.out.println("keySet = " + keySet);
        }
        for (Object value : claims.values()) {
            System.out.println("value = " + value);
        }

        // 닉네임을 변경한다.
        boolean isSuccess = userService.modifyNickname(id, nickname);

        System.out.println("여긴?");
        if (!isSuccess) {
            return new ResponseEntity<>("이미 사용중인 닉네임 입니다.", HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>("닉네임 수정 성공", HttpStatus.OK);
    }

    @PostMapping("/uploads")
    public ResponseEntity<Object> uploadFiles(@RequestHeader("Authorization") String token,
        @RequestParam(value = "fileType") String fileType,
        @RequestPart(value = "files") MultipartFile multipartFile) {

        // 토큰을 가져오고
        Map<String, Object> claims = jwtUtil.getClaims(token);

        // 토큰에서 유저 아이디를 가져온다
        int userId = (int) claims.get("id");
        long id = (long) userId;

        UserDto userDto = userService.getUserDto(id);

        // 이미지가 존재하면 삭제하고
        if (userDto.getImage() != null) {
            userService.deleteFile(userDto.getImage());
        }

        boolean isSuccess = userService.uploadFiles(id, fileType, multipartFile);

        if (!isSuccess) {
            return new ResponseEntity<>("이미지 저장에 실패하였습니다", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("이미지 저장 완료", HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> delete(@RequestHeader("Authorization") String token) {
        // 토큰을 가져오고
        Map<String, Object> claims = jwtUtil.getClaims(token);

        // 토큰에서 유저 아이디를 가져온다
        int userId = (int) claims.get("id");
        long id = (long) userId;

        // 유저를 삭제한다
        userService.delete(id);

        return new ResponseEntity<>("", HttpStatus.OK);
    }


}
