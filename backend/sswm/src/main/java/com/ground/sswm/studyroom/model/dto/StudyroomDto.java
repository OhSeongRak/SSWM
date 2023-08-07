package com.ground.sswm.studyroom.model.dto;

import com.ground.sswm.studyroom.model.Studyroom;
import com.ground.sswm.tag.model.dto.TagDto;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StudyroomDto {

    private String name;
    private String notice;
    private boolean isPublic;
    private String enterCode;
    private int maxUserNum;
    private int maxRestTime;
    private int studyAvgTime;
    private String image;
    private boolean isDeleted;
    private long createdAt;
    private List<TagDto> tags;


    @Builder
    public StudyroomDto(String name, String notice, boolean isPublic, String enterCode,
        int maxUserNum, int maxRestTime, int studyAvgTime, String image, boolean isDeleted,
        long createdAt) {
        this.name = name;
        this.notice = notice;
        this.isPublic = isPublic;
        this.enterCode = enterCode;
        this.maxUserNum = maxUserNum;
        this.maxRestTime = maxRestTime;
        this.studyAvgTime = studyAvgTime;
        this.image = image;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
    }

    public static StudyroomDto from(Studyroom studyroom) {
        return StudyroomDto.builder()
            .name(studyroom.getName())
            .notice(studyroom.getNotice())
            .isPublic(studyroom.isPublic())
            .enterCode(studyroom.getEnterCode())
            .maxUserNum(studyroom.getMaxUserNum())
            .maxRestTime(studyroom.getMaxRestTime())
            .studyAvgTime(studyroom.getStudyAvgTime())
            .image(studyroom.getImage())
            .isDeleted(studyroom.isDeleted())
            .createdAt(studyroom.getCreatedAt())
            .build();
    }
}