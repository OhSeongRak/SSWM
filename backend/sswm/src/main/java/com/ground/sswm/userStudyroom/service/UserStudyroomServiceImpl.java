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
import java.util.ArrayList;
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
  public void joinUser(Long userId, Long studyroomId, UserStudyroomReqDto userStudyroomReqDto) {
    //****엔티티 조회 (두 줄 주석풀고 그 밑에두줄은 지움)****
    //User user = userRepository.findById(userId).get();
    //Studyroom studyroom = studyroomRepository.findById(studyroomId).get();
    User user = new User();
    Studyroom studyroom = new Studyroom();

    //userStudyroom 생성
    UserStudyroom userStudyroom = UserStudyroom.from(userStudyroomReqDto);

    //userStudyroom에 user, studyroom 엔티티 추가
    userStudyroom.setUser(user);
    userStudyroom.setStudyroom(studyroom);

    userStudyroomRepository.save(userStudyroom);
  }

  @Override
  @Transactional

  public void leaveUser(Long userId, Long studyroomId) {
    //userId와 studyroomId로 검색
    UserStudyroom userStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(userId, studyroomId).get();
    userStudyroom.setDeleted(true);


    //****오류 리스트****
    //userId or studyroomId 에 해당하는 값들이 없을 때
    //이미 deleted 되었을 때
  }
  @Override
  //스터디룸 유저 조회(현재 접송중 체크)
  public List<OnAirResDto> searchUser(Long userId, Long studyroomId) {
    List<OnAirResDto> OnAirResDtos = new ArrayList<>(); //리턴할 리스트 생성

    //스터디룸 아이디로 userStudyroom 전부 가져옴
    List<UserStudyroom> userStudyrooms = userStudyroomRepository.findAllByStudyroomId(studyroomId);


    //해당 스터디룸에 해당하는 유저 및 현재 접속중인지 체크해서 목록 리턴해줌
    for (UserStudyroom userStudyroom : userStudyrooms
    ) {
      User userInStudyroom = userStudyroom.getUser();

      //****isInLive에 대한 정보는 이후 레디스에서 가져옴****
      boolean isInLive = true;

      OnAirResDto nowOnAirResDto = new OnAirResDto(UserDto.from(userInStudyroom), isInLive); //새로운 유저 생성
      OnAirResDtos.add(nowOnAirResDto); //유저 목록에 유저 넣기
    }

    return OnAirResDtos;
  }



  @Override
  @Transactional

  public void banUser(Long userId, Long targetId, Long studyroomId) {
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
  public void passRole(Long userId, Long targetId, Long studyroomId) {
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
