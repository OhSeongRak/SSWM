package com.ground.sswm.studyroom;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ground.sswm.auth.service.AuthService;
import com.ground.sswm.chat.dto.ChatDto;
import com.ground.sswm.chat.service.ChatService;
import com.ground.sswm.studyroom.dto.SearchStudyroomReqDto;
import com.ground.sswm.studyroom.dto.SearchStudyroomResDto;
import com.ground.sswm.studyroom.dto.StudyroomDto;
import com.ground.sswm.studyroom.service.StudyroomService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/studyrooms")
public class StudyroomController {

    private final StudyroomService studyroomService;
    private final ChatService chatService;
    private final AuthService authService;

    private final ObjectMapper objectMapper;

    // 전체 조회 (아직 구현하지 않았습니다!!!!!!)
    @GetMapping
    @ResponseBody
    public ResponseEntity<List<SearchStudyroomResDto>> list(
        @RequestBody SearchStudyroomReqDto searchStudyroomReqDto) {
        List<SearchStudyroomResDto> studyrooms = studyroomService.list(searchStudyroomReqDto);
        return new ResponseEntity<List<SearchStudyroomResDto>>(studyrooms, HttpStatus.OK);
    }

    // 스터디룸 생성
    @PostMapping
    @ResponseBody
    public ResponseEntity<Long> add(@RequestHeader("Authorization") String token,
        @RequestBody StudyroomDto studyroomDto) {

        // 실제로는 이렇게 해야함!
        Map<String, Object> claims = authService.getClaimsFromToken(token);
        Long userId = Long.valueOf(claims.get("id").toString());
        Long studyroomId = studyroomService.add(userId, studyroomDto);

        return new ResponseEntity<Long>(studyroomId, HttpStatus.OK);
    }

    // 스터디룸 수정
    @PutMapping("/{studyroomId}")
    @ResponseBody
    public ResponseEntity<Void> update(@PathVariable("studyroomId") Long studyroomId,
        @RequestBody StudyroomDto studyroomDto) {
        studyroomService.update(studyroomId, studyroomDto);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping("/{studyroomId}")
    @ResponseBody
    public ResponseEntity<Void> delete(@PathVariable("studyroomId") Long studyroomId) {
        studyroomService.delete(studyroomId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    // id로 스터디룸 조회
    @GetMapping("/{studyroomId}")
    @ResponseBody
    public ResponseEntity<StudyroomDto> select(@PathVariable("studyroomId") Long studyroomId) {
        StudyroomDto studyroom = studyroomService.select(studyroomId);
        return new ResponseEntity<StudyroomDto>(studyroom, HttpStatus.OK);
    }

    // 룸 제목 중복 확인
    @GetMapping("/exists")
    @ResponseBody
    public ResponseEntity<Boolean> exists(@RequestBody StudyroomDto studyroomDto) {
        boolean isExist = studyroomService.exists(studyroomDto.getName());
        return new ResponseEntity<Boolean>(isExist, HttpStatus.OK);

    }

    // 스터디룸 참여 -> 아직은 사용안함
    @GetMapping("/enter/{studyroomId}")
    public ResponseEntity<List<ChatDto>> enterStudyroom(
        @PathVariable(required = false) Long studyroomId,
        @RequestParam String userId) {

        List<ChatDto> chatList = chatService.findAllChatByStudyroomId(studyroomId);

        String chatListJson;
        try {
            chatListJson = objectMapper.writeValueAsString(chatList);
        } catch (Exception e) {
            // 처리 오류 처리
            chatListJson = "[]"; // 혹은 다른 오류 처리 방법을 사용
        }

        for (ChatDto chatDto : chatList) {
            System.out.println("chatDto = " + chatDto);
        }
        return new ResponseEntity<List<ChatDto>>(chatList, HttpStatus.OK);
    }
}
