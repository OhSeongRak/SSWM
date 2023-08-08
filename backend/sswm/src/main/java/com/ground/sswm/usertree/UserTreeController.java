package com.ground.sswm.usertree;

import com.ground.sswm.auth.service.AuthService;
import com.ground.sswm.usertree.model.dto.UserTreeDto;
import com.ground.sswm.usertree.service.UserTreeService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user/trees")
public class UserTreeController {

    private final UserTreeService userTreeService;
    private final AuthService authService;

    @PostMapping
    public ResponseEntity<String> randTree(@RequestHeader("Authorization") String token) {
        Map<String, Object> headerToken = authService.getClaimsFromToken(token);
        Long userId = Long.valueOf(headerToken.get("id").toString());

        String result = userTreeService.randTree(userId);

        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<UserTreeDto>> searchTree(
        @RequestHeader("Authorization") String token, Long treeId) {
        Map<String, Object> headerToken = authService.getClaimsFromToken(token);
        Long userId = Long.valueOf(headerToken.get("id").toString());

        List<UserTreeDto> userTreeDtos = userTreeService.searchTree(userId, treeId);

        return new ResponseEntity<List<UserTreeDto>>(userTreeDtos, HttpStatus.OK);
    }
}
