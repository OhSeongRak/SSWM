package com.ground.sswm.event;

import com.ground.sswm.event.domain.StudyEventStatus;
import com.ground.sswm.event.domain.StudyEventType;
import com.ground.sswm.event.service.StudyEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/event")
@RequiredArgsConstructor
public class StudyEventController {
    private final StudyEventService studyEventService;
    @GetMapping
    public ResponseEntity<?> eventLogging(@RequestParam("type") StudyEventType studyEventType,
        @RequestParam("status") StudyEventStatus studyEventStatus){
        studyEventService.addEventLog(studyEventType,studyEventStatus);
        return new ResponseEntity<>("", HttpStatus.OK);
    }
}
