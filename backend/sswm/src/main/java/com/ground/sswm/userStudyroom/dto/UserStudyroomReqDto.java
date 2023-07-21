package com.ground.sswm.userStudyroom.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter@Setter@ToString
public class UserStudyroomReqDto {
  private String role;
  private boolean isBan;
  private boolean isDeleted;
  private int totalStudy;
  private int totalRest;
  private Long userId;
  private Long studyroomId;

}
