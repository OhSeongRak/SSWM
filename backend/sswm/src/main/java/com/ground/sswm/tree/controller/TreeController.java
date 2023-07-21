package com.ground.sswm.tree.controller;

import com.ground.sswm.tree.domain.Tree;
import com.ground.sswm.tree.dto.TreeDto;
import com.ground.sswm.tree.service.TreeService;
import com.ground.sswm.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/trees")
public class TreeController {
    private final TreeService treeService;

    @PostMapping("/{id}")
    public ResponseEntity<?> saveTree(@RequestHeader UserDto userDto,@RequestBody TreeDto treeDto, @PathVariable Long id){
        treeService.saveTree(userDto, id,treeDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }
}
