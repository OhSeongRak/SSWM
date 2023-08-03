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
    private StudyEventType type; //LIVE, REST, STRETCH
    private StudyEventStatus status; // ON,OFF

    public StudyEventDto(StudyEventType type, StudyEventStatus status, Long studyroomId) {
        this.type = type;
        this.status = status;
        this.studyroomId = studyroomId;
    }
}
