package com.ground.sswm.common.schedule;

import static com.ground.sswm.common.util.UnixTimeUtil.getCurrentUnixTime;
import static com.ground.sswm.common.util.UnixTimeUtil.getStartEndOfPeriod;
import static com.ground.sswm.common.util.UnixTimeUtil.toSeoulTime;

import com.ground.sswm.common.util.CalExpFromDailyLog;
import com.ground.sswm.common.util.dto.ExpDto;
import com.ground.sswm.dailyLog.model.DailyLog;
import com.ground.sswm.dailyLog.model.dto.DailyLogDto;
import com.ground.sswm.dailyLog.repository.DailyLogRepository;
import com.ground.sswm.studyroom.model.Studyroom;
import com.ground.sswm.studyroom.repository.StudyroomRepository;
import com.ground.sswm.user.model.User;
import com.ground.sswm.user.repository.UserRepository;
import com.ground.sswm.userStudyroom.model.UserStudyroom;
import com.ground.sswm.userStudyroom.repository.UserStudyroomRepository;
import com.ground.sswm.usertree.model.UserTree;
import com.ground.sswm.usertree.repository.UserTreeRepository;
import java.time.ZoneId;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MySQLSelfService {

    private final DailyLogRepository dailyLogRepository;
    private final UserStudyroomRepository userStudyroomRepository;
    private final StudyroomRepository studyroomRepository;
    private final UserRepository userRepository;
    private final UserTreeRepository userTreeRepository;
    public void dailyLogToUserStudyroom() {
        // [0] 작업을 진행할 초기 시간 ~ 끝 시간 선택
        long[] days = getStartEndOfPeriod(getCurrentUnixTime(), ZoneId.of("Asia/Seoul"), 1);

        log.debug("[오늘 새벽 N시에 작업 진행] : 전날0N시 ~ 다음날 (N-1)시59분59초\t"
            + toSeoulTime(days[0]) + " " + toSeoulTime(days[1]));

        // [1] DailyLog에서 (studyTime, restTime, stretchScore) 읽어오기
        List<DailyLog> dailyLogList = dailyLogRepository.findAllDateBetween(days[0], days[1]);

        // [2]UserStudyroom (totalStudy, totalRest)에 누적업데이트하기
        // TODO : Test Code 작성해서 확인해보기
        dailyLogList.forEach(
            x -> {
                UserStudyroom userStudyroom = userStudyroomRepository
                    .findByUserIdAndStudyroomId(x.getUser().getId(), x.getStudyroom().getId())
                    .orElse(null);
                if (userStudyroom == null) {
                    return;
                }
                userStudyroom.setTotalRest(x.getRestTime() + userStudyroom.getTotalRest());
                userStudyroom.setTotalStudy(x.getStudyTime() + userStudyroom.getTotalStudy());
                userStudyroomRepository.save(userStudyroom);
            }
        );
    }

    //userStudyroom -> Studyroom
    public void UserStudyroomToStudyroom() {
        long count = studyroomRepository.count();
        for(long i=1; i<=count; i++){
            Studyroom studyroom = studyroomRepository.findById(i).get();

            List<UserStudyroom> userStudyrooms = userStudyroomRepository.findAllByStudyroomId(i);
            int sum = 0, cnt = 0;
            for (UserStudyroom userStudyroom:userStudyrooms
            ) {
               if(userStudyroom.isDeleted()) continue;
                sum += userStudyroom.getTotalStudy();
                cnt += 1;
            }
            studyroom.setStudyAvgTime(sum / cnt);
            studyroomRepository.save(studyroom);

        }
    }
    //dayillog -> usertree (04시)
    public void dailylogToUsesTree(){

        //유저를 전부 가져옴
        List<User> users = userRepository.findAll();

        //어제(새벽4시 이므로)의 데일리 로그를 전부 가져옴
        long[] days = getStartEndOfPeriod(getCurrentUnixTime(), ZoneId.of("Asia/Seoul"), 1);
        List<DailyLog> dailyLogs = dailyLogRepository.findAllDateBetween(days[0], days[1]);
        //유저에 대해 나무 계산
        for (User user: users) {
            Long userId = user.getId();
            //유저 트리를 모두 가져옴
            List<UserTree> userTrees = userTreeRepository.findAllByUserId(userId);
            if(userTrees.isEmpty()) continue;




            ExpDto expDto = CalExpFromDailyLog.getTimeAndScoreFromDailyLog(userId, dailyLogs);

            //어떤 나무에 적용할지 고르기 위한 for
            for (UserTree userTree: userTrees
            ) {
                //키우고 있는 나무라면
                if (userTree.getExp() < 3400){
                    //경험치 계산
                    userTree.setExp(userTree.getExp() +
                        CalExpFromDailyLog.calExp(
                            expDto.getStudyTime(),
                            expDto.getRestTime(),
                            expDto.getStretchScore()
                        )
                    );

                    //오늘 다 키웠다면 최대 경험치로 설정
                    if (userTree.getExp() > 3400){
                        userTree.setExp(3400);
                    }

                    userTreeRepository.save(userTree);
                    break;
                }
            }

        }

    }

    //나무 경험치

}
