package com.ground.sswm.event.service;

import com.ground.sswm.event.domain.dto.StudyEventDto;

public interface StudyEventService {

    // 시간 업데이트
    void addEventLog(Long userId, Long time, StudyEventDto studyEventDto, int dayBefore);
}
