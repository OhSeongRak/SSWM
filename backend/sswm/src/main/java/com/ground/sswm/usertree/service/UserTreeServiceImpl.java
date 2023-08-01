package com.ground.sswm.usertree.service;

import com.ground.sswm.tree.domain.Tree;
import com.ground.sswm.user.domain.User;
import com.ground.sswm.usertree.domain.UserTree;
import com.ground.sswm.usertree.domain.UserTreeRepository;
import com.ground.sswm.usertree.dto.UserTreeDto;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserTreeServiceImpl implements UserTreeService {

    private final UserTreeRepository userTreeRepository;


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

    @Override
    public List<UserTreeDto> searchTree(Long userId, Long treeId) {
        List<UserTree> userTrees = userTreeRepository.findAllByUserIdAndTreeId(userId, treeId);
        List<UserTreeDto> userTreeDtos = new ArrayList<>();

        for(UserTree userTree : userTrees){
            UserTreeDto userTreeDto = new UserTreeDto();
            userTreeDto.setUserId(userId);
            userTreeDto.setTreeId(treeId);
            userTreeDto.setExp(userTree.getExp());

            userTreeDtos.add(userTreeDto);
        }

        return userTreeDtos;
    }
}
