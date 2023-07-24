package com.ground.sswm.userStudyroom.service;

import com.ground.sswm.dailyLog.domain.DailyLog;
import com.ground.sswm.dailyLog.domain.DailyLogRepository;
import com.ground.sswm.studyroom.domain.Studyroom;
import com.ground.sswm.studyroom.domain.StudyroomRepository;
import com.ground.sswm.user.domain.User;
import com.ground.sswm.user.domain.UserRepository;
import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.userStudyroom.domain.StudyMemberRole;
import com.ground.sswm.userStudyroom.domain.UserStudyroom;
import com.ground.sswm.userStudyroom.domain.UserStudyroomRepository;
import com.ground.sswm.userStudyroom.dto.OnAirResDto;
import com.ground.sswm.userStudyroom.dto.UserAttendResDto;
import com.ground.sswm.userStudyroom.dto.UserStudyTimeResDto;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.PriorityQueue;

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
    //스터디룸에 가입
    public String joinUser(Long userId, Long studyroomId) {

        //****엔티티 조회 (두 줄 주석풀고 그 밑 네 줄은 지움)****
        //User user = userRepository.findById(userId).get();
        //Studyroom studyroom = studyroomRepository.findById(studyroomId).get();
        User user = new User();
        user.setId(userId);
        Studyroom studyroom = new Studyroom();
        studyroom.setId(studyroomId);

        //****이 사람이 탈퇴되었는지, 벤인지도 체크해줘야함****
        Optional<UserStudyroom> OpuserStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(
            userId, studyroomId);
        if (OpuserStudyroom.isEmpty()) {

            //userStudyroom 생성
            UserStudyroom newUserStudyroom = new UserStudyroom();

            //userStudyroom에 user, studyroom 엔티티 추가
            newUserStudyroom.setUser(user);
            newUserStudyroom.setStudyroom(studyroom);
            newUserStudyroom.setBan(false);
            newUserStudyroom.setRole(StudyMemberRole.GUEST);
            newUserStudyroom.setDeleted(false);
            newUserStudyroom.setTotalRest(0);
            newUserStudyroom.setTotalStudy(0);

            userStudyroomRepository.save(newUserStudyroom);
            return "가입 성공";
        }

        UserStudyroom userStudyroom = OpuserStudyroom.get();
        if (userStudyroom.isBan()) {
            return "가입 불가";
        }
        if (userStudyroom.isDeleted()) {
            userStudyroom.setDeleted(false);
            userStudyroomRepository.save(userStudyroom);
            return "재가입 성공";
        }
        return "이미 가입됨";
    }

    @Override
    @Transactional
    //스터디룸에서 탈퇴
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
    //스터디룸에서 유저 차단
    public void banUser(Long userId, Long targetId, Long studyroomId) {
        //userId(Host), studyroomId로 userStudyroom 가져오기
        UserStudyroom hostStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(userId,
            studyroomId).get();

        //호스트가 맞는지 판단
        if (hostStudyroom.getRole() == StudyMemberRole.GUEST) {
            return; //Exception 처리
        }

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

    @Override
    @Transactional
    //스터디룸 방장 권한 넘기기
    public void passRole(Long userId, Long targetId, Long studyroomId) {
        //userId(Host), studyroomId로 userStudyroom 가져오기
        UserStudyroom hostStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(userId,
            studyroomId).get();

        //호스트가 맞는지 판단
        if (hostStudyroom.getRole()  == StudyMemberRole.HOST) {
            //호스트를 게스트로 변경 가져오기
            hostStudyroom.setRole(StudyMemberRole.GUEST);

            //게스트 가져오기
            UserStudyroom guestStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(
                targetId,
                studyroomId).get();

            //****게스트가 맞는지 판단(자기 자신 벤 못하게)****
            //code

            //****게스트가 탈퇴되지 않았는지 판단****
            //code

            //호스트로 변경
            guestStudyroom.setRole(StudyMemberRole.HOST);
        }
    }

    @Override
    //스터디룸에서 공부량 top3 조회
    public List<UserStudyTimeResDto> searchDailyStudy(Long studyroomId) {
        //빈 UserStudyTimeResDto 생성
        List<UserStudyTimeResDto> userStudyTimeResDtos = new ArrayList<>();

        //스터디룸 아이디 및 날짜로 검색해서 공부량 top3 가져오기
        List<DailyLog> dailyLogs = dailyLogRepository.findTop3ByStudyroomIdAndDateOrderByStudyTimeDesc(
            studyroomId, 123);

        //3명의 데일리 로그로 UserStudyTimeResDto리스트 만들기
        for (DailyLog dailyLog : dailyLogs
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
    //스터디룸에서 출석률 top3 조회
    public List<UserAttendResDto> searchDailyAttend(Long studyroomId, int startDate, int endDate) {
        //user를 다 가져온 뒤 dailylog에서 각각을 카운트 한 뒤, 정렬한 다음 3명만 조회
        //빈 UserStudyTimeResDto 생성
        List<UserAttendResDto> userAttendResDtos = new ArrayList<>();

        //우선순위큐 생성
        PriorityQueue<UserAttendResDto> userAttendResDtoQueue = new PriorityQueue<>();

        //studyroomId에 해당하는 userStudyrooms가져오기
        List<UserStudyroom> userStudyrooms = userStudyroomRepository.findAllByStudyroomId(
            studyroomId);

        //deleted 하지 않은 userId만 가져오기
        for (UserStudyroom userStudyroom : userStudyrooms) {
            if (userStudyroom.isDeleted()) {
                continue;
            }

            //새 userAttendResDto 생성
            UserAttendResDto nowUserAttenedResDto = new UserAttendResDto();

            //user entity가져와서 set
            User user = userStudyroom.getUser();
            nowUserAttenedResDto.setUserDto(UserDto.from(user));

            //해당 날짜에 출석한 날짜 카운트 및 set
            int attendDays = dailyLogRepository.countByUserIdAndStudyroomIdAndDateBetween(
                user.getId(), studyroomId, startDate, endDate);
            nowUserAttenedResDto.setAttendDays(attendDays);

            //우선순위 큐에 push
            userAttendResDtoQueue.add(nowUserAttenedResDto);
        }

        //출석일이 가장 많은 3명 뽑기
        for (int i = 0; i < 3; i++) {
            userAttendResDtos.add(userAttendResDtoQueue.poll());
        }

        return userAttendResDtos;
    }
}
