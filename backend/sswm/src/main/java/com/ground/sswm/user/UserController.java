package com.ground.sswm.user;


import com.ground.sswm.auth.service.AuthService;
import com.ground.sswm.image.util.FileManageUtil;
import com.ground.sswm.user.exception.NicknameAlreadyExistException;
import com.ground.sswm.user.model.dto.UserDto;
import com.ground.sswm.user.model.dto.UserResDto;
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
    private final AuthService authService;
    private final FileManageUtil fileManageUtil;

    @Deprecated
    @PostMapping
    public ResponseEntity<?> add(@RequestBody UserDto userDto) {   //FOR Test
        log.debug("[POST] /users " + userDto);
        userService.addUser(userDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

//    @Deprecated
//    @GetMapping
//    public ResponseEntity<List<UserDto>> getAll() {  //FOR Test
//        List<UserDto> userDtoList = userService.getAllUser();
//        return new ResponseEntity<>(userDtoList, HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity<UserResDto> get(@RequestHeader("Authorization") String token) {
        Map<String, Object> claims = authService.getClaimsFromToken(token);
        Long userId = Long.valueOf(claims.get("id").toString());
        UserResDto userResDto = userService.getUserResDto(userId);
        return new ResponseEntity<>(userResDto, HttpStatus.OK);
    }

    // 토큰의 유효성 검사는 프론트에서 하나?
    @PutMapping
    public ResponseEntity<?> modify(@RequestHeader("Authorization") String token,
        @RequestPart(value = "file", required = false) MultipartFile multipartFile,
        @RequestPart(value = "fileType", required = false) String fileType,
        @RequestPart(value = "nickname", required = false) String nickname)
        throws NicknameAlreadyExistException {
//        log.debug("[PUT] /user : file " + multipartFile.getOriginalFilename());
        log.debug("[PUT] /user : fileType " + fileType);
        log.debug("[PUT] /user : nickname " + nickname);

        Map<String, Object> claims = authService.getClaimsFromToken(token);
        Long userId = Long.valueOf(claims.get("id").toString());

        String filePath = null;
        if (fileType != null && !fileType.isBlank() && multipartFile != null
            && !multipartFile.isEmpty()) {
            filePath = fileManageUtil.uploadFile(fileType, multipartFile);
        }

        log.debug("[filePath]>>>> " + filePath);

        userService.modifyUser(userId, nickname, filePath);

        return new ResponseEntity<>("닉네임 수정 성공", HttpStatus.OK);
    }

    // 닉네임 중복 확인
    @GetMapping("/exists")
    public ResponseEntity<Boolean> exists(@RequestParam String nickname) {
        log.debug("스터디룸이름 : " + nickname);
        boolean isExist = userService.exists(nickname);
        return new ResponseEntity<Boolean>(isExist, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> delete(@RequestHeader("Authorization") String token) {
        Map<String, Object> claims = authService.getClaimsFromToken(token);
        long userId = Long.valueOf(claims.get("id").toString());

        userService.delete(userId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }


}
