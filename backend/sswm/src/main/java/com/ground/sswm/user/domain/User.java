package com.ground.sswm.user.domain;

import com.ground.sswm.user.dto.UserDto;
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
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;

  @Builder
  public User(Long id, String name) {
    this.id = id;
    this.name = name;
  }

  public static User from(UserDto userDto) {
    return User.builder().name(userDto.getName()).build();
  }
}
