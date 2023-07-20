package com.ground.sswm.userStudyroom.domain;

import com.ground.sswm.studyroom.domain.Studyroom;
import com.ground.sswm.user.domain.User;
import com.ground.sswm.userStudyroom.dto.UserStudyroomDto;
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
public class UserStudyroom {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private String role;
  private Integer isDeleted;
  private Integer totalStudy;
  private Integer totalRest;

  @ManyToOne
  @JoinColumn(name = "USER_ID")
  private User user;

  @ManyToOne
  @JoinColumn(name = "STUDYROOM_ID")
  private Studyroom studyroom;


  @Builder
  public UserStudyroom(Integer id, String role, Integer isDeleted, Integer totalStudy,
      Integer totalRest, User user, Studyroom studyroom) {
    this.id = id;
    this.role = role;
    this.isDeleted = isDeleted;
    this.totalStudy = totalStudy;
    this.totalRest = totalRest;
    this.user = user;
    this.studyroom = studyroom;
  }




  public static UserStudyroom from(UserStudyroomDto userStudyroomDto) {
    return UserStudyroom.builder()
        .role(userStudyroomDto.getRole())
        .isDeleted(userStudyroomDto.getIsDeleted())
        .totalStudy(userStudyroomDto.getTotalStudy())
        .totalRest(userStudyroomDto.getTotalRest())
        .build();
  }
}
