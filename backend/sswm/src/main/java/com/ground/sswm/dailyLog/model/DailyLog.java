package com.ground.sswm.dailyLog.model;

import static javax.persistence.FetchType.LAZY;

import com.ground.sswm.dailyLog.model.dto.DailyLogDto;
import com.ground.sswm.studyroom.model.Studyroom;
import com.ground.sswm.user.model.User;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class DailyLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private long studyTime;
    private long restTime;
    private int stretchScore;
    private long date;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "STUDYROOM_ID")
    private Studyroom studyroom;

    @Builder
    public DailyLog(Long id, long studyTime, long restTime, int stretchScore, long date, User user,
        Studyroom studyroom) {
        this.id = id;
        this.studyTime = studyTime;
        this.restTime = restTime;
        this.stretchScore = stretchScore;
        this.date = date;
        this.user = user;
        this.studyroom = studyroom;
    }

    public static DailyLog from(DailyLogDto dailyLogDto) {
        return com.ground.sswm.dailyLog.model.DailyLog.builder()
            .studyTime(dailyLogDto.getStudyTime())
            .restTime(dailyLogDto.getRestTime())
            .date(dailyLogDto.getDate())
            .build();
    }

}
