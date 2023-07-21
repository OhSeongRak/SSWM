package com.ground.sswm.usertree.controller;

import com.ground.sswm.usertree.domain.UserTree;
import com.ground.sswm.usertree.service.UserTreeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user-trees")
public class UserTreeController {
    private final UserTreeService userTreeService;

    @GetMapping
    public List<UserTree> findAll(){
        return (List<UserTree>) userTreeService.findAll();
    }
}
