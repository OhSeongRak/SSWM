package com.ground.sswm.dailyLog;

import com.ground.sswm.auth.service.AuthService;
import com.ground.sswm.dailyLog.model.dto.CalenderDto;
import com.ground.sswm.dailyLog.model.dto.DailyLogDto;
import com.ground.sswm.dailyLog.service.DailyLogService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user-logs")
public class DailyLogController {

    private final DailyLogService dailyLogService;
    private final AuthService authService;

    @PostMapping("/{studyroomId}")
    public ResponseEntity<?> add(@RequestHeader("Authorization") String token,
        @PathVariable Long studyroomId) {
        log.debug("studyroomId : " + studyroomId);
        Map<String, Object> headerToken = authService.getClaimsFromToken(token);
        Long userId = Long.valueOf(headerToken.get("id").toString());
        log.debug("userId :" + userId);
        dailyLogService.create(studyroomId, userId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> list(@RequestHeader("Authorization") String token,
        @RequestParam long start, @RequestParam long end) {
        log.debug("start : " + start / 1000L);
        log.debug("end :" + end / 1000L);
        Map<String, Object> headerToken = authService.getClaimsFromToken(token);
        Long userId = Long.valueOf(headerToken.get("id").toString());
        log.debug("userId : " +userId);
        CalenderDto calenderDto = dailyLogService.selcectDailyLogsByUserId(userId, start/1000L, end/1000L-86399L);

        return new ResponseEntity<>(calenderDto, HttpStatus.OK);
    }

    @GetMapping("/{studyroomId}")
    public ResponseEntity<?> getDailylog(@RequestHeader("Authorization") String token,
        @PathVariable("studyroomId") Long studyroomId) {
        Long userId = authService.getUserIdFromToken(token);
        DailyLogDto dailyLogDto = dailyLogService.getDailylog(userId, studyroomId);
        log.debug("dailyLogDto : " + dailyLogDto);
        return new ResponseEntity<DailyLogDto>(dailyLogDto, HttpStatus.OK);
    }
}
