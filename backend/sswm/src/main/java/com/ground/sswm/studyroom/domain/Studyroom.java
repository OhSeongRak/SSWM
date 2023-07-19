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

@Entity
@Getter
@NoArgsConstructor
public class Studyroom {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private String name;
  private Integer isPublic;
  private String enterCode;
  private Integer maxUserNum;
  private Integer maxRestTime;
  private Integer sutdyAvgTime;
  private String image;
  private Integer isDeleted;
  private Date createdAt;


  @Builder
  public Studyroom(Integer id, String name, Integer isPublic, String enterCode, Integer maxUserNum,
      Integer maxRestTime, Integer sutdyAvgTime, String image, Integer isDeleted, Date createdAt) {
    this.id = id;
    this.name = name;
    this.isPublic = isPublic;
    this.enterCode = enterCode;
    this.maxUserNum = maxUserNum;
    this.maxRestTime = maxRestTime;
    this.sutdyAvgTime = sutdyAvgTime;
    this.image = image;
    this.isDeleted = isDeleted;
    this.createdAt = createdAt;
  }



  public static Studyroom from(StudyroomDto studyroomDto) {
    return Studyroom.builder().name(studyroomDto.getName()).build();
  }
}
