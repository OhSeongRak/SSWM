package com.ground.sswm.dailyLog;

import com.ground.sswm.auth.service.AuthService;
import com.ground.sswm.dailyLog.service.DailyLogService;
import com.ground.sswm.studyroom.model.dto.StudyroomDto;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
        log.debug("studyroomId : " +studyroomId);
        Map<String, Object> headerToken = authService.getClaimsFromToken(token);
        Long userId = Long.valueOf(headerToken.get("id").toString());
        log.debug("userId :" +userId);
        dailyLogService.create(studyroomId,userId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> list(@RequestParam Long start,@RequestParam Long end) {
        return null;
    }

}
