package com.ground.sswm.studyroom;

import com.ground.sswm.auth.service.AuthService;
import com.ground.sswm.image.util.FileManageUtil;
import com.ground.sswm.studyroom.model.dto.SearchStudyroomReqDto;
import com.ground.sswm.studyroom.model.dto.SearchStudyroomResDto;
import com.ground.sswm.studyroom.model.dto.StudyroomDto;
import com.ground.sswm.studyroom.service.StudyroomService;
import com.ground.sswm.user.exception.NicknameNullException;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/studyrooms")
public class StudyroomController {

    private final StudyroomService studyroomService;
    private final AuthService authService;

    private final FileManageUtil fileManageUtil;

    // 전체 조회
    @PostMapping("/list")
    public ResponseEntity<List<SearchStudyroomResDto>> list(
        @RequestBody SearchStudyroomReqDto searchStudyroomReqDto) {
        List<SearchStudyroomResDto> studyrooms = studyroomService.list(searchStudyroomReqDto);
        return new ResponseEntity<List<SearchStudyroomResDto>>(studyrooms, HttpStatus.OK);
    }


    // 스터디룸 생성
    @PostMapping
    @ResponseBody
    public ResponseEntity<Long> add(@RequestHeader("Authorization") String token,
        @RequestPart(value = "studyroomDto", required = false) StudyroomDto studyroomDto,
        @RequestPart(value = "file", required = false) MultipartFile multipartFile,
        @RequestPart(value = "fileType", required = false) String fileType) {

        log.debug("[POST] /user : file " + multipartFile);
        log.debug("[POST] /user : fileType " + fileType);
        log.debug("[POST] /user : token " + token);
        log.debug("[POST] /user : studyroomDto " + studyroomDto);
        log.debug("[POST] /user : studyroomDto " + studyroomDto.getTags());

        // 실제로는 이렇게 해야함!
        Map<String, Object> claims = authService.getClaimsFromToken(token);
        Long userId = Long.valueOf(claims.get("id").toString());

        log.debug("userId :" + userId);

        // 이미지 저장
        String filePath = "image/studyDefault/dolphin.jpg";
        if (fileType != null && !fileType.isBlank() && multipartFile != null
            && !multipartFile.isEmpty()) {
            filePath = fileManageUtil.uploadFile(fileType, multipartFile);
        }

        log.debug("[filePath]>>>> " + filePath);
        log.debug("[userNum]>>>> " + studyroomDto.getUserNum());
        studyroomDto.setImage(filePath);

        Long studyroomId = studyroomService.add(userId, studyroomDto);

        return new ResponseEntity<Long>(studyroomId, HttpStatus.OK);
    }



    // 스터디룸 수정
    @PutMapping("/{studyroomId}")
    public ResponseEntity<Void> update(@PathVariable("studyroomId") Long studyroomId,
        @RequestPart(value = "file", required = false) MultipartFile multipartFile,
        @RequestPart(value = "fileType", required = false) String fileType,
        @RequestPart("studyroom") StudyroomDto studyroomDto) {
        log.debug("PUT : update studyroom");
        // 이미지 저장
        String filePath = "image/studyDefault/dolphin.jpg";
        if (fileType != null && !fileType.isBlank() && multipartFile != null
            && !multipartFile.isEmpty()) {
            filePath = fileManageUtil.uploadFile(fileType, multipartFile);
        }

        studyroomDto.setImage(filePath);

        studyroomService.update(studyroomId, studyroomDto, filePath);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    //스터디룸 삭제
    @PutMapping("/{studyroomId}/delete")
    public ResponseEntity<Void> delete(@PathVariable("studyroomId") Long studyroomId) {

        studyroomService.delete(studyroomId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    // id로 스터디룸 조회
    @GetMapping("/{studyroomId}")
    @ResponseBody
    public ResponseEntity<StudyroomDto> selectByStudyroomId(@PathVariable("studyroomId") Long studyroomId) {
        log.debug("studyroomId : "+studyroomId);
        StudyroomDto studyroomDto = studyroomService.selectByStudyroomId(studyroomId);
        return new ResponseEntity<StudyroomDto>(studyroomDto, HttpStatus.OK);
    }

    // 유저 ID로 스터디룸 조회
    @GetMapping
    public ResponseEntity<List<SearchStudyroomResDto>> selectByUserId(
        @RequestHeader("Authorization") String token) {
        Long userId = authService.getUserIdFromToken(token);

        List<SearchStudyroomResDto> studyrooms = studyroomService.selectByUserId(userId);

        return new ResponseEntity<List<SearchStudyroomResDto>>(studyrooms, HttpStatus.OK);
    }

    @GetMapping("/enterCode")
    public ResponseEntity<Boolean> checkEnterCode(@RequestParam Long studyroomId, @RequestParam String enterCode) {
        boolean isCorrect = studyroomService.checkEnterCode(studyroomId, enterCode);
        return new ResponseEntity<Boolean>(isCorrect, HttpStatus.OK);
    }
    // 룸 제목 중복 확인
    @GetMapping("/exists")
    public ResponseEntity<Boolean> exists(@RequestParam(required = false) Long studyroomId, @RequestParam String name) {
        log.debug("스터디룸이름 : " + name);

        if (name == null || name.trim().isEmpty()) {
            throw new NicknameNullException("제목은 빈칸이 될 수 없습니다.");
        }

        String regex = "^\\s+.*|.*\\s+$";

        if (Pattern.matches(regex, name)) {
            throw new NicknameNullException("제목은 빈칸이 될 수 없습니다."); // 제목에 공백이 들어가는 경우
        }

        boolean isExist = studyroomService.exists(studyroomId,name);
        return new ResponseEntity<Boolean>(isExist, HttpStatus.OK);
    }
}
