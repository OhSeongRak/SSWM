package com.ground.sswm.usertree.service;

import static com.ground.sswm.common.util.UnixTimeUtil.getCurrentUnixTime;
import static com.ground.sswm.common.util.UnixTimeUtil.getStartEndOfPeriod;

import com.ground.sswm.common.util.CalExpFromDailyLog;
import com.ground.sswm.common.util.dto.ExpDto;
import com.ground.sswm.dailyLog.model.DailyLog;
import com.ground.sswm.dailyLog.repository.DailyLogRepository;
import com.ground.sswm.tree.exception.TreeNotFoundException;
import com.ground.sswm.tree.model.Tree;
import com.ground.sswm.tree.repository.TreeRepository;
import com.ground.sswm.user.model.User;
import com.ground.sswm.usertree.model.UserTree;
import com.ground.sswm.usertree.model.dto.UserTreeResDto;
import com.ground.sswm.usertree.repository.UserTreeRepository;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserTreeServiceImpl implements UserTreeService {

    private final UserTreeRepository userTreeRepository;
    private final TreeRepository treeRepository;
    private final DailyLogRepository dailyLogRepository;

    @Override
    public UserTreeResDto randTree(Long userId) {
        User user = new User();
        user.setId(userId);
        System.out.println("user = " + user);

        List<Long> treeId = userTreeRepository.findByUserIdNotIn(userId);

        if (treeId.isEmpty()) {
            throw new TreeNotFoundException("남은 나무가 없습니다.");
        }

        for (Long t : treeId) {
            log.debug("treeId : " + t);
        }
        Collections.shuffle(treeId);

        Optional<Tree> tree = treeRepository.findById(treeId.get(0));

        UserTree userTree = new UserTree();
        userTree.setUser(user);
        userTree.setTree(tree.get());
        userTree.setExp(0);

        // userTree DB 에 저장
        userTreeRepository.save(userTree);

        UserTreeResDto userTreeResDto = new UserTreeResDto();
        userTreeResDto.setUserExp(0);
        userTreeResDto.setName("씨앗");
        userTreeResDto.setCurrent(true);
        userTreeResDto.setImage(
            "https://sswm-image.s3.ap-northeast-2.amazonaws.com/image/trees/seed/seeds.png");

        return userTreeResDto;
    }

    //유저 아이디에 해당하는 나무를 찾아서 response해줌
    @Override
    public List<UserTreeResDto> searchTree(Long userId) {

        List<UserTree> userTrees = userTreeRepository.findAllByUserId(userId);

        if (userTrees.isEmpty()) {
            return null;
        }

        List<UserTreeResDto> userTreeResDtos = new ArrayList<>();

        //해당 유저의 모든 나무에 대해서
        for (UserTree userTree : userTrees) {

            Long treeId = userTree.getTree().getId();
            UserTreeResDto userTreeResDto = new UserTreeResDto();

            long[] days = getStartEndOfPeriod(getCurrentUnixTime(), ZoneId.of("Asia/Seoul"), 0);

            List<DailyLog> dailyLogs = dailyLogRepository.findAllByUserIdAndDateBetween(userId,
                days[0], days[1] - 86400L);


            //dailylog에서 시간 및 점수 합산해서 가져옴
            ExpDto expDto = CalExpFromDailyLog.getTimeAndScoreFromDailyLog(userId, dailyLogs);

            float calExp = CalExpFromDailyLog.calExp(
                expDto.getStudyTime(),
                expDto.getRestTime(),
                expDto.getStretchScore()
            );

            //시간 및 점수로 경험치 계산해서 가져옴
            userTreeResDto.setUserExp(userTree.getExp() + calExp);
            userTreeResDto.setDayExp(calExp);

            //해당 나무가 아직 키우고 있는 상태라면
            if (userTreeResDto.getUserExp() < 3400) {
                //현재 나무라고 알려줌
                userTreeResDto.setCurrent(true);

                // 12렙 이상이면
                if (userTreeResDto.getUserExp() >= 1550) {
                    if (userTree.getTree().getId() == 3L) {
                        userTreeResDto.setName("아기 선인장");
                        userTreeResDto.setImage(
                            "https://sswm-image.s3.ap-northeast-2.amazonaws.com/image/trees/preTree/preCactus.png");

                    } else {
                        userTreeResDto.setName("나무");
                        userTreeResDto.setImage(
                            "https://sswm-image.s3.ap-northeast-2.amazonaws.com/image/trees/preTree/pretree.png");
                    }
                    userTreeResDtos.add(userTreeResDto);

                    continue;
                }

                // 5렙 이상이면
                if (userTreeResDto.getUserExp() >= 400) {
                    userTreeResDto.setName("새싹");
                    userTreeResDto.setImage(
                        "https://sswm-image.s3.ap-northeast-2.amazonaws.com/image/trees/sprout/sprout.png");
                    userTreeResDtos.add(userTreeResDto);

                    continue;
                }

                // 1렙 이상이면
                if (userTreeResDto.getUserExp() >= 0) {
                    userTreeResDto.setName("씨앗");
                    userTreeResDto.setImage(
                        "https://sswm-image.s3.ap-northeast-2.amazonaws.com/image/trees/seed/seeds.png");
                    userTreeResDtos.add(userTreeResDto);

                    continue;
                }

            }
            //이미 다 키운 나무라면
            else {
                userTreeResDto.setCurrent(false);
                userTreeResDto.setUserExp(userTree.getExp() + calExp);

                //잘못된 아이디로 나무를 조회하면(거의 가능성 없는 오류)
                Tree tree = treeRepository.findById(treeId).orElseThrow(
                    () -> new TreeNotFoundException("해당 나무가 없습니다.")
                );

                userTreeResDto.setName(tree.getName());
                userTreeResDto.setImage(tree.getImage());
                userTreeResDtos.add(userTreeResDto);
            }

            //response 데이터에 set
//            userTreeResDto.setUserTreeDto(userTreeDto);

        }

        return userTreeResDtos;
    }
}
