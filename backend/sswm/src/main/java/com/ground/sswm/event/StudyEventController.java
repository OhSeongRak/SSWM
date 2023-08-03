package com.ground.sswm.event;

import static com.ground.sswm.common.util.UnixTimeUtil.getCurrentUnixTime;

import com.ground.sswm.auth.service.AuthService;
import com.ground.sswm.event.dto.StudyEventDto;
import com.ground.sswm.event.service.StudyEventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@Slf4j
@RestController
@RequestMapping("/event")
@RequiredArgsConstructor
public class StudyEventController {
    private final StudyEventService studyEventService;
    private final AuthService authService;
    @PostMapping//studyroom, 종류, 상태, user
    public ResponseEntity<?> eventLogging(
        @RequestHeader("Authorization") String token,
        @RequestBody StudyEventDto studyEventDto){
        Long userId = authService.getUserIdFromToken(token);
        log.debug("[POST] token studyEventType studyEventStatus" + studyEventDto);

        studyEventService.addEventLog(userId, getCurrentUnixTime(), studyEventDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }


}
