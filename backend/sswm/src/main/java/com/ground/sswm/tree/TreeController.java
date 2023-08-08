package com.ground.sswm.tree;

import com.ground.sswm.tree.model.dto.TreeDto;
import com.ground.sswm.tree.service.TreeService;
import com.ground.sswm.user.model.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/trees")
public class TreeController {

    private final TreeService treeService;

    @PostMapping("/{id}")
    public ResponseEntity<?> saveTree(@RequestHeader UserDto userDto, @RequestBody TreeDto treeDto,
        @PathVariable Long id) {
        treeService.saveTree(userDto, id, treeDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }
}
