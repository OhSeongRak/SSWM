package com.ground.sswm.tree;

import com.ground.sswm.auth.service.AuthService;
import com.ground.sswm.tree.model.dto.TreeDto;
import com.ground.sswm.tree.service.TreeService;
import com.ground.sswm.user.model.dto.UserDto;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
    private final AuthService authService;

    @PostMapping("/{id}")
    public ResponseEntity<?> saveTree(@RequestBody TreeDto treeDto,
        @RequestHeader("Authorization") String token) {

        Map<String, Object> headerToken = authService.getClaimsFromToken(token);
        treeService.saveTree(treeDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }
}
