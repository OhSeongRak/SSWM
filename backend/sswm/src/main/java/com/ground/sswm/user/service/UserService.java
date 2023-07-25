package com.ground.sswm.user.service;


import com.ground.sswm.auth.oauth.OAuthUserInfo;
import com.ground.sswm.user.domain.User;
import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.user.dto.UserResDto;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface
UserService {

    void addUser(UserDto userReqDto);

    UserResDto getUserResDto(Long userId);

    UserDto getUserDto(Long userId);

    List<UserDto> getAllUser();

    void delete(Long userId);

    User getUserByProviderId(String provider, String providerId);

    User addOAuthUser(OAuthUserInfo oauthUser);

    boolean modifyNickname(Long id, String nickaname);


    /**
     * S3에 업로드
     */
    public boolean uploadFiles(Long id, String fileType, MultipartFile multipartFile);

    /**
     * S3에 업로드된 파일 삭제
     */
    public String deleteFile(String keyName);

    /**
     * UUID 파일명 반환
     */
    public String getUuidFileName(String fileName);

    /**
     * 년/월/일 폴더명 반환
     */
    public String getFolderName();
}
