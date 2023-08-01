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
    private StudyEventType event; //LIVE, REST, STRETCH
    private StudyEventStatus studyEventStatus; // ON,OFF
    private int time; //해당 이벤트가 발생한 시각

    public StudyEventDto(StudyEventType event, StudyEventStatus studyEventStatus, int time) {
        this.event = event;
        this.studyEventStatus = studyEventStatus;
        this.time = time;
    }
}
