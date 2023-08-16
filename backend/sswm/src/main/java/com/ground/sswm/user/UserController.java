package com.ground.sswm.user;


import com.ground.sswm.auth.service.AuthService;
import com.ground.sswm.image.util.FileManageUtil;
import com.ground.sswm.user.exception.NicknameAlreadyExistException;
import com.ground.sswm.user.exception.NicknameNullException;
import com.ground.sswm.user.model.dto.UserDto;
import com.ground.sswm.user.model.dto.UserResDto;
import com.ground.sswm.user.service.UserService;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
        Long id = authService.getUserIdFromToken(token);
        UserResDto userResDto = userService.getUserResDto(id);
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
        log.debug("[PUT] /user : nickname " + URLDecoder.decode(nickname, StandardCharsets.UTF_8));

        Long id = authService.getUserIdFromToken(token);

        String filePath = null;
        if (fileType != null && !fileType.isBlank() && multipartFile != null
            && !multipartFile.isEmpty()) {
            filePath = fileManageUtil.uploadFile(fileType, multipartFile);
        }

        log.debug("[filePath]>>>> " + filePath);

        userService.modifyUser(id, URLDecoder.decode(nickname, StandardCharsets.UTF_8), filePath);

        return new ResponseEntity<>("닉네임 수정 성공", HttpStatus.OK);
    }

    // 닉네임 중복 확인
    @GetMapping("/exists")
    public ResponseEntity<Boolean> exists(@RequestHeader("Authorization") String token,
        @RequestParam String nickname) {
        log.debug("닉네임 : " + nickname);
        if (nickname == null || nickname.trim().isEmpty()) {
            throw new NicknameNullException("닉네임은 빈칸이 될 수 없습니다.");
        }
        // 정규 표현식을 사용하여 닉네임에 공백이 들어가는지 확인
        // ^ : 문자열의 시작
        // \\s : 공백 문자 (스페이스, 탭, 줄바꿈 등)
        // * : 0개 이상의 연속된 공백 문자
        // $ : 문자열의 끝
        String regex = "^\\s+.*|.*\\s+$|.*\\s+.*";

        if (Pattern.matches(regex, nickname)) {
            throw new NicknameNullException("닉네임은 빈칸이 될 수 없습니다."); // 닉네임에 공백이 들어가는 경우
        }

        Long userId = authService.getUserIdFromToken(token);
        boolean isExist = userService.exists(nickname, userId);
        return new ResponseEntity<Boolean>(isExist, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> delete(@RequestHeader("Authorization") String token) {
        Map<String, Object> claims = authService.getClaimsFromToken(token);
        Long userId = Long.valueOf(claims.get("id").toString());

        // todo
        // 방장인지 확인
        // userStudyRoom is_deleted=1
        // 해당 studyroom의 usernum -1
        userService.delete(userId);

        return new ResponseEntity<>("삭제 완료", HttpStatus.OK);
    }


}
