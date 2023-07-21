package com.ground.sswm.userStudyroom.service;

import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.userStudyroom.domain.UserStudyroom;
import com.ground.sswm.userStudyroom.domain.UserStudyroomRepository;
import com.ground.sswm.userStudyroom.dto.OnAirResDto;
import com.ground.sswm.userStudyroom.dto.UserStudyroomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserStudyroomServiceImpl implements UserStudyroomService {

  private UserStudyroomRepository userStudyroomRepository;

  @Override
  @Transactional
  public void join(UserDto userDto, Integer studyroomId, UserStudyroomDto userStudyroomDto) {
    //User user = User.from(userDto);

    //이후 유저가 토큰으로 바뀌면 주석제거 후 변경
    //엔티티 조회
    //User user = UserRepository.findById(userDto.getId());
    //Studyroom studyroom = StudyroomRepository.findById(studyroomId);

    //userStudyroom 생성
    UserStudyroom userStudyroom = UserStudyroom.from(userStudyroomDto);

    //userStudyroom에 엔티티 추가
    //userStudyroom.setUser(user);
    //userStudyroom.setStudyroom(studyroom);

    userStudyroomRepository.save(userStudyroom);
  }

  @Override
  public OnAirResDto searchUser(UserDto userDto, Integer studyroomId) {

    return null;
  }

  @Override
  public void leave(UserDto userDto, Integer studyroomId) {

  }

  @Override
  public void ban(UserDto userDto, Integer targetId, Integer studyroomId) {

  }

  @Override
  public void pass(UserDto userDto, Integer userId, Integer studyroomId) {

  }
}
