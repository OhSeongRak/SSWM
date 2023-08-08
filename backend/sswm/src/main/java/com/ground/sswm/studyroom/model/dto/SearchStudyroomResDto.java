package com.ground.sswm.studyroom.model.dto;

import com.ground.sswm.studyroom.model.Studyroom;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
public class SearchStudyroomResDto {

    private Long id;
    private boolean isPublic;
    private String code;
    private String image;
    private String name;
    private int userNum;
    private int maxUserNum;
    private long createdTime;
    private int studyAvgTime;
    private List<String> tagNames;

    public static SearchStudyroomResDto from(Studyroom studyroom) {
        return SearchStudyroomResDto.builder()
            .id(studyroom.getId())
            .isPublic(studyroom.getIsPublic())
            .code(studyroom.getEnterCode())
            .image(studyroom.getImage())
            .name(studyroom.getName())
            .userNum(studyroom.getUserNum())
            .maxUserNum(studyroom.getMaxUserNum())
            .createdTime(studyroom.getCreatedAt())
            .studyAvgTime(studyroom.getStudyAvgTime())
            .maxUserNum(studyroom.getMaxUserNum())
            .build();
    }

//    public SearchStudyroomResDto(Long id, boolean isPublic, String code, String image, String name,
//        int maxUserNum, long createdTime, int studyAvgTime) {
//        this.id = id;
//        this.isPublic = isPublic;
//        this.code = code;
//        this.image = image;
//        this.name = name;
//        this.maxUserNum = maxUserNum;
//        this.createdTime = createdTime;
//        this.studyAvgTime = studyAvgTime;
//    }


}
