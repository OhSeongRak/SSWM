package com.ground.sswm.userStudyroom.service;

import com.ground.sswm.dailyLog.model.DailyLog;
import com.ground.sswm.dailyLog.repository.DailyLogRepository;
import com.ground.sswm.event.repository.StudyEventRepository;
import com.ground.sswm.studyroom.model.Studyroom;
import com.ground.sswm.studyroom.repository.StudyroomRepository;
import com.ground.sswm.user.model.User;
import com.ground.sswm.user.model.dto.UserDto;
import com.ground.sswm.user.repository.UserRepository;
import com.ground.sswm.userStudyroom.exception.UserStudyroomForbiddenException;
import com.ground.sswm.userStudyroom.exception.UserStudyroomNotFoundException;
import com.ground.sswm.userStudyroom.exception.UserStudyroomUnauthorizedException;
import com.ground.sswm.userStudyroom.model.StudyMemberRole;
import com.ground.sswm.userStudyroom.model.UserStudyroom;
import com.ground.sswm.userStudyroom.model.dto.OnAirResDto;
import com.ground.sswm.userStudyroom.model.dto.UserAttendResDto;
import com.ground.sswm.userStudyroom.model.dto.UserStudyTimeResDto;
import com.ground.sswm.userStudyroom.repository.UserStudyroomRepository;
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
    private final StudyEventRepository studyEventRepository;

    @Override
    @Transactional
    //스터디룸에 가입
    public String joinUser(Long userId, Long studyroomId) {

        //엔티티 조회
        User user = userRepository.findById(userId).get();
        Studyroom studyroom = studyroomRepository.findById(studyroomId).orElseThrow(
            () -> new UserStudyroomNotFoundException("해당 스터디룸이 없습니다.")
        );

        //userstudyroom에서 찾아옴
        Optional<UserStudyroom> OpUserStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(
            userId, studyroomId);

        //처음 스터디룸에 참여하는 사용자라면
        if (OpUserStudyroom.isEmpty()) {

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

        // 이 사람이 벤이라면
        UserStudyroom userStudyroom = OpUserStudyroom.get();
        if (userStudyroom.isBan()) {
            return "가입 불가";
        }
        // 이 사람이 탈퇴됐다면
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
        UserStudyroom userStudyroom = userStudyroomRepository
            .findByUserIdAndStudyroomId(userId, studyroomId).orElseThrow(
                () -> new UserStudyroomNotFoundException("" + userId)
            );

        //이미 삭제되었다면
        if (userStudyroom.isDeleted()) {
            throw new UserStudyroomUnauthorizedException("해당 스터디룸에 가입되어 있지 않습니다.");
        }

        //호스트라면
        if (userStudyroom.getRole() == StudyMemberRole.HOST) {
            throw new UserStudyroomUnauthorizedException(
                "호스트는 스터디룸에서 탈퇴될 수 없습니다. 호스트 권한을 넘기고 탈퇴해주세요");
        }

        userStudyroom.setDeleted(true);
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
            List<Long> inLiveUsers = studyEventRepository.findUserIdsInLive(studyroomId);
            boolean isInLive =
                inLiveUsers.stream().filter(x -> x == userInStudyroom.getId()).count() == 1 ?
                    true : false;

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
            studyroomId).orElseThrow(
            () -> new UserStudyroomNotFoundException("해당 스터디룸에 가입되어 있지 않습니다.")
        );

        //호스트가 맞는지 판단
        if (hostStudyroom.getRole() == StudyMemberRole.GUEST) {
            throw new UserStudyroomUnauthorizedException("스터디룸의 호스트가 아닙니다");
        }

        //게스트 가져오기
        UserStudyroom guestStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(
            targetId,
            studyroomId).orElseThrow(
            () -> new UserStudyroomNotFoundException("해당 사용자가 스터디룸에 가입되어 있지 않습니다.")
        );

        //자기 자신 차단하려고 할 때
        if (userId == targetId) {
            throw new UserStudyroomForbiddenException("호스트는 차단될 수 없습니다.");
        }

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
            studyroomId).orElseThrow(
            () -> new UserStudyroomNotFoundException("해당 스터디룸에 가입되어 있지 않습니다.")
        );

        //호스트가 맞는지 판단
        if (hostStudyroom.getRole() == StudyMemberRole.HOST) {
            //호스트를 게스트로 변경 가져오기
            hostStudyroom.setRole(StudyMemberRole.GUEST);

            //게스트 가져오기
            UserStudyroom guestStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(
                targetId,
                studyroomId).orElseThrow(
                () -> new UserStudyroomNotFoundException("해당 사용자가 스터디룸에 가입되어 있지 않습니다.")
            );

            //게스트가 맞는지 판단(자기 자신 권한 못넘기게)
            if (userId == targetId) {
                throw new UserStudyroomForbiddenException("본인 외 다른 사용자를 선택해주세요");
            }

            //****게스트가 탈퇴되지 않았는지 판단****
            if (guestStudyroom.isDeleted()) {
                throw new UserStudyroomNotFoundException("해당 사용자가 스터디룸에 가입되어 있지 않습니다.");
            }

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
            long studyTime = dailyLog.getStudyTime();
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
        for (int i = 0; i < Math.min(3, userAttendResDtoQueue.size()); i++) {
            userAttendResDtos.add(userAttendResDtoQueue.poll());
        }

        return userAttendResDtos;
    }
}
