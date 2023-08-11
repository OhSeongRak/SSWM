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
import com.ground.sswm.usertree.model.dto.UserTreeDto;
import com.ground.sswm.usertree.model.dto.UserTreeResDto;
import com.ground.sswm.usertree.repository.UserTreeRepository;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

        List<Long> trees = userTreeRepository.findByUserIdNotIn(userId);

        Collections.shuffle(trees);
        Tree tree = treeRepository.findById(trees.get(0)).orElseThrow(
            () -> new TreeNotFoundException("남은 나무가 없습니다.")
        );;

        UserTree userTree = new UserTree();
        userTree.setUser(user);
        userTree.setTree(tree);
        userTree.setExp(0);

        userTreeRepository.save(userTree);
        UserTreeDto userTreeDto = new UserTreeDto();
        userTreeDto.setUserId(userId);
        userTreeDto.setTreeId(tree.getId());
        userTreeDto.setExp(0);
        UserTreeResDto userTreeResDto = new UserTreeResDto();
        userTreeResDto.setUserTreeDto(userTreeDto);
        userTreeResDto.setName(tree.getName());
        userTreeResDto.setCurrent(true);
        userTreeResDto.setImage(tree.getImage());
        return userTreeResDto;
    }

    //유저 아이디에 해당하는 나무를 찾아서 response해줌
    @Override
    public List<UserTreeResDto> searchTree(Long userId) {
        List<UserTree> userTrees = userTreeRepository.findAllByUserId(userId);
        List<UserTreeResDto> userTreeResDtos = new ArrayList<>();

        //해당 유저의 모든 나무에 대해서
        for (UserTree userTree : userTrees) {
            Long treeId = userTree.getTree().getId();
            UserTreeResDto userTreeResDto = new UserTreeResDto();
            UserTreeDto userTreeDto = new UserTreeDto();

            //해당 나무가 아직 키우고 있는 상태라면
            if (userTree.getExp() < 3400){
                //현재 나무라고 알려줌
                userTreeResDto.setCurrent(true);

                long[] days = getStartEndOfPeriod(getCurrentUnixTime(), ZoneId.of("Asia/Seoul"), 0);
                List<DailyLog> dailyLogs = dailyLogRepository.findAllByUserIdAndDateBetween(userId, days[0], days[1]);
                //dailylog에서 시간 및 점수 합산해서 가져옴
                ExpDto expDto = CalExpFromDailyLog.getTimeAndScoreFromDailyLog(userId, dailyLogs);

                //시간 및 점수로 경험치 계산해서 가져옴
                userTreeDto.setExp(userTree.getExp() +
                    CalExpFromDailyLog.calExp(
                        expDto.getStudyTime(),
                        expDto.getRestTime(),
                        expDto.getStretchScore()
                    )
                );

            }
            //이미 다 키운 나무라면
            else{
                userTreeResDto.setCurrent(false);
                userTreeDto.setExp(userTree.getExp());
            }

            userTreeDto.setUserId(userId);
            userTreeDto.setTreeId(treeId);

            //response 데이터에 set
            userTreeResDto.setUserTreeDto(userTreeDto);

            //잘못된 아이디로 나무를 조회하면(거의 가능성 없는 오류)
            Tree tree = treeRepository.findById(treeId).orElseThrow(
                () -> new TreeNotFoundException("해당 나무가 없습니다.")
            );

            userTreeResDto.setName(tree.getName());
            userTreeResDto.setImage(tree.getImage());

            userTreeResDtos.add(userTreeResDto);
        }

        return userTreeResDtos;
    }
}
