package com.ground.sswm.userStudyroom.service;

import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.userStudyroom.domain.UserStudyroom;
import com.ground.sswm.userStudyroom.domain.UserStudyroomRepository;
import com.ground.sswm.userStudyroom.dto.OnAirResDto;
import com.ground.sswm.userStudyroom.dto.UserStudyroomDto;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserStudyroomServiceImpl implements UserStudyroomService {

  private final UserStudyroomRepository userStudyroomRepository;

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
  @Transactional
  public void leave(UserDto userDto, Integer studyroomId) {

  }

  @Override
  @Transactional
  public void ban(String userId, Integer targetId, Integer studyroomId) {
    UserStudyroom hostStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(Integer.valueOf(userId), studyroomId);
    if(hostStudyroom.getRole() == "Host") {
      UserStudyroom guestStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(targetId,
          studyroomId);
      guestStudyroom.setIsBan(1);
      guestStudyroom.setIsDeleted(1);
    }
  }

  @Override
  @Transactional
  public void pass(String userId, Integer targetId, Integer studyroomId) {
    UserStudyroom hostStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(Integer.valueOf(userId), studyroomId);
    hostStudyroom.setRole("Guest");
    UserStudyroom guestStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(targetId, studyroomId);
    guestStudyroom.setRole("Host");
  }

  @Override
  public List<UserDto> searchDailyStudy(UserDto userDto, Integer studyroomId) {
    return null;
  }

  @Override
  public List<UserDto> searchDailyAttend(UserDto userDto, Integer studyroomId) {
    return null;
  }
}
