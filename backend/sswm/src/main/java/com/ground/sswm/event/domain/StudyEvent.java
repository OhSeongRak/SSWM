package com.ground.sswm.event.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@ToString
@Getter
@Setter
public class StudyEvent {
    private StudyEventType event;
    private StudyEventStatus studyEventStatus;
    private int enterTime;

}
