package com.ground.sswm.event.service;

import com.ground.sswm.event.domain.StudyEvent;
import com.ground.sswm.event.dto.StudyEventDto;
import com.ground.sswm.event.domain.StudyEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudyEventServiceImpl implements StudyEventService{
    private final StudyEventRepository studyEventRepository;
    @Override
    public void addEventLog(Long userId, StudyEventDto studyEventDto) {
        studyEventRepository.save(StudyEvent.from(userId,studyEventDto));
    }
}
