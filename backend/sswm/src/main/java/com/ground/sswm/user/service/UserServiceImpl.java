package com.ground.sswm.user.service;

import com.ground.sswm.auth.oauth.OAuthUserInfo;
import com.ground.sswm.user.domain.User;
import com.ground.sswm.user.domain.UserRepository;
import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.user.dto.UserResDto;
import com.ground.sswm.user.exception.UserNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
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
    public UserResDto getUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
            () -> new UserNotFoundException("" + userId)
        );
        return UserResDto.from(user);
    }

    @Override
    public void modifyUser(Long userId, UserDto userReqDto) {
        User user = userRepository.findById(userId).orElseThrow(
            () -> new UserNotFoundException("" + userId)
        );
        if (userReqDto.getNickname() != null) {
            user.setNickname(userReqDto.getNickname());
        }
        if (userReqDto.getImage() != null) {
            user.setImage(userReqDto.getImage());
        }
        userRepository.save(user).getId();
    }

    @Override
    public List<UserDto> getAllUser() {
        List<UserDto> userList = userRepository.findAll().stream()
            .map(UserDto::from)
            .collect(Collectors.toList());
        return userList;
    }

    @Override
    public void delete(Long userId) {
        userRepository.delete(
            userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("" + userId)
            )
        );
    }

    @Override
    public User getUserByProviderId(String provider, String providerId) {
        return userRepository.findByProviderAndProviderId(provider, providerId);
    }

    @Override
    public User addOAuthUser(OAuthUserInfo oauthUser) {
        User newUser = User.builder()
            .name(oauthUser.getName())
            .email(oauthUser.getEmail())
            .provider(oauthUser.getProvider())
            .providerId(oauthUser.getProviderId())
            .isAdmin(false)
            .build();
        return userRepository.save(newUser);
    }
}
