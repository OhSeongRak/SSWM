package com.ground.sswm.event.dto;

import com.ground.sswm.event.domain.StudyEventStatus;
import com.ground.sswm.event.domain.StudyEventType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class StudyEventDto {
    private Long studyroomId;
    private StudyEventType event; //LIVE, REST, STRETCH
    private StudyEventStatus studyEventStatus; // ON,OFF

    public StudyEventDto(StudyEventType event, StudyEventStatus studyEventStatus, Long studyroomId) {
        this.event = event;
        this.studyEventStatus = studyEventStatus;
        this.studyroomId = studyroomId;
    }
}
