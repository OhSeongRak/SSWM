package com.ground.sswm.userStudyroom.dto;

import com.ground.sswm.studyroom.domain.Studyroom;
import com.ground.sswm.user.domain.User;
import java.util.Date;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter@Setter@ToString
public class UserStudyroomDto {
  private String role;
  private Integer isDeleted;
  private Integer totalStudy;
  private Integer totalRest;
  private Integer userId;
  private Integer studyroomId;

}
