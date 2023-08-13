package com.ground.sswm.user.service;

import com.ground.sswm.auth.oauth.model.OAuthUserInfo;
import com.ground.sswm.common.util.UnixTimeUtil;
import com.ground.sswm.image.util.FileManageUtil;
import com.ground.sswm.user.exception.NicknameAlreadyExistException;
import com.ground.sswm.user.exception.UserNotFoundException;
import com.ground.sswm.user.model.User;
import com.ground.sswm.user.model.dto.UserDto;
import com.ground.sswm.user.model.dto.UserResDto;
import com.ground.sswm.user.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final FileManageUtil fileManageUtil;

    @Override
    public void addUser(UserDto userDto) {
        User user = User.from(userDto);
        user.setCreatedAt(UnixTimeUtil.getCurrentUnixTime());
        userRepository.save(user);
    }

    @Override
    public UserResDto getUserResDto(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
            () -> new UserNotFoundException("" + userId)
        );
        return UserResDto.from(user);
    }

    @Override
    public UserDto getUserDto(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
            () -> new UserNotFoundException("" + userId)
        );
        return UserDto.from(user);
    }


    @Override
    public List<UserDto> getAllUser() {
        List<UserDto> userList = userRepository.findAll().stream()
            .map(UserDto::from)
            .collect(Collectors.toList());
        return userList;
    }

    @Override
    public void delete(Long id) {
        User user = userRepository.findById(id).orElseThrow(
            () -> new UserNotFoundException("" + id));

        userRepository.delete(user);

        // 이미지 지우기
        if (user.getImage() != null) {
            fileManageUtil.deleteFile(user.getImage());
        }
    }

    @Override
    public User getUserByProviderId(String provider, String providerId) {
        return userRepository.findByProviderAndProviderId(provider, providerId);
    }

    @Override
    public User addOAuthUser(OAuthUserInfo oauthUser) {
        User newUser = User.builder()
            .name(oauthUser.getName())
            .nickname(oauthUser.getNickname() != "" ? oauthUser.getNickname() : oauthUser.getName())
            .image("image/userDefault/fubao.jpg")
            .email(oauthUser.getEmail())
            .provider(oauthUser.getProvider())
            .providerId(oauthUser.getProviderId())
            .isAdmin(false)
            .createdAt(UnixTimeUtil.getCurrentUnixTime())
            .build();
        return userRepository.save(newUser);
    }

    @Override
    public void modifyUser(Long id, String nickname, String imagePath) {
        log.debug("modifyUser " + id + " " + nickname + " " + imagePath);
        User user = userRepository.findById(id).orElseThrow(
            () -> new UserNotFoundException("" + id));

        // 닉네임 바꾸는 경우
        if (nickname != null && !nickname.isBlank()) {
            // 다른 사람이 바꾸고자하는 닉네임 이미 사용하고 있음
            User findUser = userRepository.findByNickname(id,nickname);
            // 만약 유저 닉네임이 중복이라면 함수 종료
            if (findUser != null) {
                throw new NicknameAlreadyExistException("이미 사용중인 닉네임 입니다.");
            }
            user.setNickname(nickname);
        }
        // 이미지 바꾸는 경우
        if (imagePath != null && !imagePath.isBlank()) {
            user.setImage(imagePath);
        }
        user.setModifiedAt(UnixTimeUtil.getCurrentUnixTime());
        // DB에 저장한다.
        userRepository.save(user);
    }

    public boolean exists(String nickname, Long id) {
        return userRepository.existsByNicknameAndIdNot(nickname, id);
    }


}
