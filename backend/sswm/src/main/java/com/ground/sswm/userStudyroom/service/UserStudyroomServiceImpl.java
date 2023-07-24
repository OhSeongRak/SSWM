package com.ground.sswm.userStudyroom.service;

import com.ground.sswm.dailyLog.domain.DailyLog;
import com.ground.sswm.dailyLog.domain.DailyLogRepository;
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
    private final DailyLogRepository dailyLogRepository;

    @Override
    @Transactional
    public void joinUser(Long userId, Long studyroomId, UserStudyroomReqDto userStudyroomReqDto) {

        //****엔티티 조회 (두 줄 주석풀고 그 밑 두 줄은 지움)****
        //User user = userRepository.findById(userId).get();
        //Studyroom studyroom = studyroomRepository.findById(studyroomId).get();
        User user = new User();
        Studyroom studyroom = new Studyroom();

        //****이 사람이 탈퇴되었는지, 벤인지도 체크해줘야함****
        //code

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
        UserStudyroom userStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(userId,
            studyroomId).get();
        userStudyroom.setDeleted(true);

        //****예상 오류 리스트****
        //userId or studyroomId 에 해당하는 값들이 없을 때
        //이미 deleted 되었을 때
    }

    @Override
    //스터디룸 유저 조회(현재 접송중 체크)
    public List<OnAirResDto> searchUser(Long userId, Long studyroomId) {
        List<OnAirResDto> OnAirResDtos = new ArrayList<>(); //리턴할 리스트 생성

        //스터디룸 아이디로 userStudyroom 전부 가져옴
        List<UserStudyroom> userStudyrooms = userStudyroomRepository.findAllByStudyroomId(
            studyroomId);

        //해당 스터디룸에 해당하는 유저 및 현재 접속중인지 체크해서 목록 리턴해줌
        for (UserStudyroom userStudyroom : userStudyrooms
        ) {
            User userInStudyroom = userStudyroom.getUser();

            //****isInLive에 대한 정보는 이후 레디스에서 가져옴****
            boolean isInLive = true;

            //새로운 유저 생성
            OnAirResDto nowOnAirResDto = new OnAirResDto(UserDto.from(userInStudyroom), isInLive);

            //유저 목록에 유저 넣기
            OnAirResDtos.add(nowOnAirResDto);
        }

        return OnAirResDtos;
    }


    @Override
    @Transactional

    public void banUser(Long userId, Long targetId, Long studyroomId) {
        //userId(Host), studyroomId로 userStudyroom 가져오기
        UserStudyroom hostStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(userId,
            studyroomId).get();

        //호스트가 맞는지 판단
        if (hostStudyroom.getRole() == "Host") {
            //게스트 가져오기
            UserStudyroom guestStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(
                targetId,
                studyroomId).get();

            //****게스트가 맞는지 판단(자기 자신 벤 못하게)****
            //code

            //게스트 벤 및 탈퇴
            guestStudyroom.setBan(true);
            guestStudyroom.setDeleted(true);
        }
    }

    @Override
    @Transactional
    public void passRole(Long userId, Long targetId, Long studyroomId) {
        //userId(Host), studyroomId로 userStudyroom 가져오기
        UserStudyroom hostStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(userId,
            studyroomId).get();

        //호스트가 맞는지 판단
        if (hostStudyroom.getRole() == "Host") {
            //호스트를 게스트로 변경 가져오기
            hostStudyroom.setRole("Guest");

            //게스트 가져오기
            UserStudyroom guestStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(
                targetId,
                studyroomId).get();

            //****게스트가 맞는지 판단(자기 자신 벤 못하게)****
            //code

            //****게스트가 탈퇴되지 않았는지 판단****
            //code

            //호스트로 변경
            guestStudyroom.setRole("Host");
        }
    }

    @Override
    public List<UserStudyTimeResDto> searchDailyStudy(Long studyroomId) {
        //빈 UserStudyTimeResDto 생성
        List<UserStudyTimeResDto> userStudyTimeResDtos = new ArrayList<>();

        //스터디룸 아이디 및 날짜로 검색해서 공부량 top3 가져오기
        List<DailyLog> dailyLogs = dailyLogRepository.findTop3ByStudyroomIdAndDateOrderByStudyTimeDesc(studyroomId, 123);

        //3명의 데일리 로그로 UserStudyTimeResDto리스트 만들기
        for (DailyLog dailyLog:dailyLogs
        ) {
            //새로운 UserStudyTimeResDto생성
            UserStudyTimeResDto userStudyTimeResDto = new UserStudyTimeResDto();

            //UserStudyTimeResDto에 set user
            User user = dailyLog.getUser();
            userStudyTimeResDto.setUserDto(UserDto.from(user));

            //UserStudyTimeResDto에 set studyTime
            int studyTime = dailyLog.getStudyTime();
            userStudyTimeResDto.setStudyTime(studyTime);

            //리스트에 추가
            userStudyTimeResDtos.add(userStudyTimeResDto);
        }

        return userStudyTimeResDtos;
    }


    @Override
    public List<UserDto> searchDailyAttend(Long userId, Long studyroomId) {
        return null;
    }
}
