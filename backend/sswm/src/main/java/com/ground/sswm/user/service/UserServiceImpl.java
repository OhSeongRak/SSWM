package com.ground.sswm.user.service;

import com.ground.sswm.user.domain.User;
import com.ground.sswm.user.domain.UserRepository;
import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.user.exception.UserNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void addUser(UserDto userDto) {
        User user = User.from(userDto);
        userRepository.save(user);
    }

    @Override
    public UserDto getUser(int userId) {
        User user = userRepository.findById(userId).orElseThrow(
            () -> new UserNotFoundException(""+userId)
        );
        return UserDto.from(user);
    }

    @Override
    public int modifyUser(UserDto userReqDto) {
        if(!userRepository.existsById(userReqDto.getId())){
            
        }
        return userRepository.save(User.from(userReqDto)).getId();

    }


}
