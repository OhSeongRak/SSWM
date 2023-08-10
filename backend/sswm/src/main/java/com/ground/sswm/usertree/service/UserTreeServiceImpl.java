package com.ground.sswm.usertree.service;

import com.ground.sswm.studyroom.exception.StudyroomNotFoundException;
import com.ground.sswm.tree.exception.TreeNotFoundException;
import com.ground.sswm.tree.model.Tree;
import com.ground.sswm.tree.repository.TreeRepository;
import com.ground.sswm.user.model.User;
import com.ground.sswm.usertree.model.UserTree;
import com.ground.sswm.usertree.model.dto.UserTreeDto;
import com.ground.sswm.usertree.model.dto.UserTreeResDto;
import com.ground.sswm.usertree.repository.UserTreeRepository;
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
            UserTreeDto userTreeDto = new UserTreeDto();
            userTreeDto.setUserId(userId);
            userTreeDto.setTreeId(treeId);
            userTreeDto.setExp(userTree.getExp());

            UserTreeResDto userTreeResDto = new UserTreeResDto();
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
