package com.ground.sswm.user.controller;


import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.user.dto.UserResDto;
import com.ground.sswm.user.service.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Deprecated
    @PostMapping
    public ResponseEntity<?> add(@RequestBody UserDto userDto) {   //FOR Test
        log.debug("[POST] /users " + userDto);
        userService.addUser(userDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }
    @Deprecated
    @GetMapping
    public ResponseEntity<List<UserDto>> getAll() {  //FOR Test
        List<UserDto> userDtoList = userService.getAllUser();
        return new ResponseEntity<>(userDtoList, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResDto> get(@PathVariable Long userId) {
        UserResDto userResDto = userService.getUser(userId);
        return new ResponseEntity<>(userResDto, HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> modify(@PathVariable Long userId, @RequestBody UserDto userDto) {
        userService.modifyUser(userId,userDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> delete(@PathVariable Long userId) {
        userService.delete(userId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }
}
