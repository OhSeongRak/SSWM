package com.ground.sswm.usertree.service;

import static com.ground.sswm.common.util.UnixTimeUtil.getCurrentUnixTime;
import static com.ground.sswm.common.util.UnixTimeUtil.getStartEndOfPeriod;

import com.ground.sswm.common.util.CalExpFromDailyLog;
import com.ground.sswm.common.util.dto.ExpDto;
import com.ground.sswm.dailyLog.model.DailyLog;
import com.ground.sswm.dailyLog.repository.DailyLogRepository;
import com.ground.sswm.studyroom.exception.StudyroomNotFoundException;
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
    public String randTree(Long userId) {
        User user = new User();
        user.setId(userId);

        List<Long> trees = userTreeRepository.findByUserIdNotIn(userId);

        Collections.shuffle(trees);

        Tree tree = new Tree();
        tree.setId(trees.get(0));

        UserTree userTree = new UserTree();
        userTree.setUser(user);
        userTree.setTree(tree);
        userTree.setExp(0);

        userTreeRepository.save(userTree);

        return "생성완료";
    }

    //유저 아이디에 해당하는 나무를 찾아서 response해줌
    @Override
    public List<UserTreeResDto> searchTree(Long userId) {
        List<UserTree> userTrees = userTreeRepository.findAllByUserId(userId);
        List<UserTreeResDto> userTreeResDtos = new ArrayList<>();

        for (UserTree userTree : userTrees) {
            Long treeId = userTree.getTree().getId();
            UserTreeResDto userTreeResDto = new UserTreeResDto();
            UserTreeDto userTreeDto = new UserTreeDto();
            if (userTreeDto.getExp() < 3400){
                userTreeResDto.setCurrent(true);

                long[] days = getStartEndOfPeriod(getCurrentUnixTime(), ZoneId.of("Asia/Seoul"), 1);
                List<DailyLog> dailyLogs = dailyLogRepository.findAllByUserIdAndDateBetween(userId, days[0], days[1]);
                ExpDto expDto = CalExpFromDailyLog.getTimeAndScoreFromDailyLog(userId, dailyLogs);

                userTreeDto.setExp(userTree.getExp() +
                        CalExpFromDailyLog.calExp(
                            expDto.getStudyTime(),
                            expDto.getRestTime(),
                            expDto.getStretchScore()
                        )
                );

            }
            else{
                userTreeResDto.setCurrent(false);
                userTreeDto.setExp(userTree.getExp());
            }

            userTreeDto.setUserId(userId);
            userTreeDto.setTreeId(treeId);



            userTreeResDto.setUserTreeDto(userTreeDto);

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
