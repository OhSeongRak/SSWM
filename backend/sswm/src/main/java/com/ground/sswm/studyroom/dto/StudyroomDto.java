package com.ground.sswm.studyroom.dto;

import com.ground.sswm.studyroom.domain.Studyroom;
import com.ground.sswm.tag.dto.TagDto;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StudyroomDto {

    private Long id;
    private String name;
    private String notice;
    private boolean isPublic;
    private String enterCode;
    private int maxUserNum;
    private int maxRestTime;
    private int studyAvgTime;
    private String image;
    private boolean isDeleted;
    private int createdAt;
    private List<TagDto> tags;

    public boolean getIsPublic() {
        return this.isPublic;
    }

    public boolean getIsDeleted() {
        return this.isDeleted;
    }

    @Builder
    public StudyroomDto(Long id, String name, String notice, boolean isPublic, String enterCode,
        int maxUserNum,
        int maxRestTime, int studyAvgTime, String image, boolean isDeleted, int createdAt) {
        this.id = id;
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
            .id(studyroom.getId())
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