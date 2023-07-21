package com.ground.sswm.userStudyroom.domain;

import static javax.persistence.FetchType.*;

import com.ground.sswm.studyroom.domain.Studyroom;
import com.ground.sswm.user.domain.User;
import com.ground.sswm.userStudyroom.dto.UserStudyroomReqDto;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import kotlin.Lazy;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class UserStudyroom {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String role;
  private boolean isBan;
  private boolean isDeleted;
  private int totalStudy;
  private int totalRest;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "USER_ID")
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "STUDYROOM_ID")
  private Studyroom studyroom;


  @Builder
  public UserStudyroom(Long id, String role, boolean isBan, boolean isDeleted, int totalStudy,
      int totalRest, User user, Studyroom studyroom) {
    this.id = id;
    this.role = role;
    this.isBan = isBan;
    this.isDeleted = isDeleted;
    this.totalStudy = totalStudy;
    this.totalRest = totalRest;
    this.user = user;
    this.studyroom = studyroom;
  }




  public static UserStudyroom from(UserStudyroomReqDto userStudyroomReqDto) {
    return UserStudyroom.builder()
        .role(userStudyroomReqDto.getRole())
        .isBan(userStudyroomReqDto.isBan())
        .isDeleted(userStudyroomReqDto.isDeleted())
        .totalStudy(userStudyroomReqDto.getTotalStudy())
        .totalRest(userStudyroomReqDto.getTotalRest())
        .build();
  }

}
