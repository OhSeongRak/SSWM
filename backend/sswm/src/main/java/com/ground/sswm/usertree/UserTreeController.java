package com.ground.sswm.usertree;

import com.ground.sswm.auth.service.AuthService;
import com.ground.sswm.usertree.model.dto.UserTreeDto;
import com.ground.sswm.usertree.model.dto.UserTreeResDto;
import com.ground.sswm.usertree.service.UserTreeService;
import java.util.ArrayList;
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
    public ResponseEntity<UserTreeResDto> randTree(@RequestHeader("Authorization") String token) {
        Map<String, Object> headerToken = authService.getClaimsFromToken(token);
        Long userId = Long.valueOf(headerToken.get("id").toString());

        UserTreeResDto userTreeResDto = userTreeService.randTree(userId);

        return new ResponseEntity<>(userTreeResDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<UserTreeResDto>> searchTree(
        @RequestHeader("Authorization") String token) {

        Map<String, Object> headerToken = authService.getClaimsFromToken(token);
        Long userId = Long.valueOf(headerToken.get("id").toString());

        List<UserTreeResDto> userTreeResDtos = userTreeService.searchTree(userId);


        if (userTreeResDtos==null) {
            userTreeResDtos=new ArrayList<>();
        }

        return new ResponseEntity<>(userTreeResDtos, HttpStatus.OK);
    }
}
