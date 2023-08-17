package com.ground.sswm.event;

import static com.ground.sswm.common.util.UnixTimeUtil.getCurrentUnixTime;

import com.ground.sswm.auth.service.AuthService;
import com.ground.sswm.event.domain.dto.StudyEventDto;
import com.ground.sswm.event.service.StudyEventService;
import java.time.LocalTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
        @RequestBody StudyEventDto studyEventDto) {
        Long userId = authService.getUserIdFromToken(token);
        log.debug("[POST] token studyEventType studyEventStatus" + studyEventDto);

        LocalTime currentTime = LocalTime.now(); // 현재시각 가져옴
        int hour = currentTime.getHour();
        int dayBefore = (hour < 4) ? 1 : 0; // [새벽4시 - 익일 0 - 익일 3시59분]
        studyEventService.addEventLog(userId, getCurrentUnixTime(), studyEventDto, dayBefore);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @GetMapping("/check-inlive")
    public ResponseEntity<Boolean> checkInLive(@RequestHeader("Authorization") String token) {
        Long userId = authService.getUserIdFromToken(token);
        boolean isInLive = studyEventService.checkInLive(userId);
        return new ResponseEntity<>(isInLive, HttpStatus.OK);
    }

    @DeleteMapping("")
    public ResponseEntity<Void> delete(@RequestHeader("Authorization") String token) {
        Long userId = authService.getUserIdFromToken(token);
        studyEventService.delete(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
