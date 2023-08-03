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
    private Long studyroomId;
    private StudyEventType event; //LIVE, REST, STRETCH
    private StudyEventStatus studyEventStatus; // ON,OFF
    private long time; //해당 이벤트가 발생한 시각
    @Builder
    public StudyEvent(Long userId, Long studyroomId, StudyEventType event,
        StudyEventStatus studyEventStatus, long time) {
        this.userId = userId;
        this.studyroomId = studyroomId;
        this.event = event;
        this.studyEventStatus = studyEventStatus;
        this.time = time;
    }


    public static StudyEvent from(Long userId,Long time, StudyEventDto studyEventDto){
        return StudyEvent.builder()
            .userId(userId)
            .studyroomId(studyEventDto.getStudyroomId())
            .event(studyEventDto.getType())
            .studyEventStatus(studyEventDto.getStatus())
            .time(time)
            .build();
    }
}
