package com.ground.sswm.event.service;

import com.ground.sswm.event.domain.StudyEventRepository;
import com.ground.sswm.event.domain.StudyEventStatus;
import com.ground.sswm.event.domain.StudyEventType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudyEventServiceImpl implements StudyEventService{
    private final StudyEventRepository studyEventRepository;
    @Override
    public void addEventLog(StudyEventType event, StudyEventStatus studyEventStatus) {
        // event.name();
        // redis에 어떤 형식으로 넣지?
    }
}
