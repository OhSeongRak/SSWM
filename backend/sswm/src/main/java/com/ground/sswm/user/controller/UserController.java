package com.ground.sswm.user.controller;


import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody UserDto userDto) {
        log.debug("[POST] /users " + userDto);
        userService.addUser(userDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> get(@PathVariable int userId) {
        UserDto userResDto = userService.getUser(userId);
        return new ResponseEntity<>(userResDto, HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> modify(@PathVariable int userId, @RequestBody UserDto userReqDto) {
        userService.modifyUser(userReqDto);
        return new ResponseEntity<>(
            "", HttpStatus.OK);
    }

}
