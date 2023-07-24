package com.ground.sswm.studyroom.domain;

import com.ground.sswm.studyroom.dto.StudyroomDto;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Studyroom {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
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
  private int userNum;

//  public boolean getIsPublic() {
//    return this.isPublic;
//  }
//
//  public boolean getIsDeleted() {
//    return this.isDeleted;
//  }

  @Builder
  public Studyroom(Long id, String name, String notice, boolean isPublic, String enterCode, int maxUserNum,
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

  public static Studyroom from(StudyroomDto studyroomDto) {
    return Studyroom.builder()
        .id(studyroomDto.getId())
        .name(studyroomDto.getName())
        .notice(studyroomDto.getNotice())
        .isPublic(studyroomDto.getIsPublic())
        .enterCode(studyroomDto.getEnterCode())
        .maxUserNum(studyroomDto.getMaxUserNum())
        .maxRestTime(studyroomDto.getMaxRestTime())
        .studyAvgTime(studyroomDto.getStudyAvgTime())
        .image(studyroomDto.getImage())
        .isDeleted(studyroomDto.getIsDeleted())
        .createdAt(studyroomDto.getCreatedAt())
        .build();
  }

  public void setUpdates(StudyroomDto studyroomDto) {
    this.setName(studyroomDto.getName());
    this.setPublic(studyroomDto.getIsPublic());
    this.setEnterCode(studyroomDto.getEnterCode());
    this.setMaxUserNum(studyroomDto.getMaxUserNum());
    this.setMaxRestTime(studyroomDto.getMaxRestTime());
    this.setImage(studyroomDto.getImage());
    this.setNotice(studyroomDto.getNotice());
  }
}
