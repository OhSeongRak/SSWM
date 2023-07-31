package com.ground.sswm.event.service;

import com.ground.sswm.event.domain.StudyEventStatus;
import com.ground.sswm.event.domain.StudyEventType;

public interface StudyEventService {
    void addEventLog(StudyEventType event, StudyEventStatus studyEventStatus);
}
