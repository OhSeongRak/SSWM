package com.ground.sswm.studyroom.dto;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter@Setter@ToString
public class StudyroomDto {
  private String name;
  private Integer isPublic;
  private String enterCode;
  private Integer maxUserNum;
  private Integer maxRestTime;
  private Integer studyAvgTime;
  private String image;
  private Integer isDeleted;
  private Date createdAt;
}
