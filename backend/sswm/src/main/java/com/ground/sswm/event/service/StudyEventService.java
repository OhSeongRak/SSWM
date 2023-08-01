package com.ground.sswm.event.service;

import com.ground.sswm.event.dto.StudyEventDto;

public interface StudyEventService {
    void addEventLog(Long userId, StudyEventDto studyEventDto);
}
