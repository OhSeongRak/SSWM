package com.ground.sswm.userStudyroom.service;

import com.ground.sswm.studyroom.domain.Studyroom;
import com.ground.sswm.studyroom.domain.StudyroomRepository;
import com.ground.sswm.user.domain.User;
import com.ground.sswm.user.domain.UserRepository;
import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.userStudyroom.domain.UserStudyroom;
import com.ground.sswm.userStudyroom.domain.UserStudyroomRepository;
import com.ground.sswm.userStudyroom.dto.OnAirResDto;
import com.ground.sswm.userStudyroom.dto.UserStudyTimeResDto;
import com.ground.sswm.userStudyroom.dto.UserStudyroomReqDto;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserStudyroomServiceImpl implements UserStudyroomService {
  private final UserRepository userRepository;
  private final StudyroomRepository studyroomRepository;
  private final UserStudyroomRepository userStudyroomRepository;
  //private final DailyLogRepository dailyLogRepository;
  @Override
  @Transactional
  public void join(Long userId, Long studyroomId, UserStudyroomReqDto userStudyroomReqDto) {
    //User user = User.from(userDto);

    //이후 유저가 토큰으로 바뀌면 주석제거 후 변경
    //엔티티 조회
//    Optional<User> user = userRepository.findById(userId);
//    Optional<Studyroom> studyroom = studyroomRepository.findById(studyroomId);
//
//    //userStudyroom 생성
//    UserStudyroom userStudyroom = UserStudyroom.from(userStudyroomReqDto);
//
//    //userStudyroom에 엔티티 추가
//    userStudyroom.setUser(user.get());
//    userStudyroom.setStudyroom(studyroom.get());
//
//    userStudyroomRepository.save(userStudyroom);
  }

  @Override
  public OnAirResDto searchUser(Long userId, Long studyroomId) {
    return null;
  }

  @Override
  @Transactional
  public void leave(Long userId, Long studyroomId) {

  }

  @Override
  @Transactional
  public void ban(Long userId, Long targetId, Long studyroomId) {
    UserStudyroom hostStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(userId, studyroomId).get();
    if(hostStudyroom.getRole() == "Host") {
      UserStudyroom guestStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(targetId,
          studyroomId).get();
      guestStudyroom.setBan(true);
      guestStudyroom.setDeleted(true);
    }
  }

  @Override
  @Transactional
  public void pass(Long userId, Long targetId, Long studyroomId) {
    UserStudyroom hostStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(userId, studyroomId).get();
    if(hostStudyroom.getRole() == "Host") {
      hostStudyroom.setRole("Guest");
      UserStudyroom guestStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(targetId,
          studyroomId).get();
      guestStudyroom.setRole("Host");
    }
  }

  @Override
  public List<UserStudyTimeResDto> searchDailyStudy(Long studyroomId) {
    //DailyLog dailyLog = dailyLogRepository.findByStudyroomIdAndDate(studyroomId, Today(int));
    //List<UserStudyroom> userStudyrooms = userStudyroomRepository.findAllByStudyroomId(studyroomId);

    return null;
  }


  @Override
  public List<UserDto> searchDailyAttend(Long userId, Long studyroomId) {
    return null;
  }
}
