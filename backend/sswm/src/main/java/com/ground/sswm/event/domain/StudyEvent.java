package com.ground.sswm.event.domain;

import com.ground.sswm.event.dto.StudyEventDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
public class StudyEvent {
    private Long userId;
    private StudyEventType event; //LIVE, REST, STRETCH
    private StudyEventStatus studyEventStatus; // ON,OFF
    private int time; //해당 이벤트가 발생한 시각
    @Builder
    public StudyEvent(Long userId, StudyEventType event, StudyEventStatus studyEventStatus,
        int time) {
        this.userId = userId;
        this.event = event;
        this.studyEventStatus = studyEventStatus;
        this.time = time;
    }
    public static StudyEvent from(Long userId,StudyEventDto studyEventDto){
        return StudyEvent.builder()
            .userId(userId)
            .event(studyEventDto.getEvent())
            .studyEventStatus(studyEventDto.getStudyEventStatus())
            .time(studyEventDto.getTime())
            .build();
    }
}
