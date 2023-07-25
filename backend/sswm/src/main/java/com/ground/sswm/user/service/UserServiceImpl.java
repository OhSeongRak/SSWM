package com.ground.sswm.user.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ground.sswm.auth.oauth.OAuthUserInfo;
import com.ground.sswm.user.domain.User;
import com.ground.sswm.user.domain.UserRepository;
import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.user.dto.UserResDto;
import com.ground.sswm.user.exception.UserNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    private final AmazonS3Client amazonS3Client;

    private final UserRepository userRepository;

//    public UserServiceImpl(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }

    @Override
    public void addUser(UserDto userDto) {
        User user = User.from(userDto);
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
            this.deleteFile(user.getImage());
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
            .email(oauthUser.getEmail())
            .provider(oauthUser.getProvider())
            .providerId(oauthUser.getProviderId())
            .isAdmin(false)
            .build();
        return userRepository.save(newUser);
    }

    @Override
    public boolean modifyNickname(Long id, String nickname) {
        User user = userRepository.findById(id).orElseThrow(
            () -> new UserNotFoundException("" + id));

        // 유저의 닉네임이 존재 할 때
        if (user.getNickname() != null) {

            User findUser = userRepository.findByNickname(nickname);

            // 만약 유저 닉네임이 중복이라면 함수 종료
            if (findUser != null) {
                return false;
            }
        }

        // 존재하지 않고 중복도 아니라면 닉네임을 바꿔준다.
        user.setNickname(nickname);

        // DB에 저장한다.
        userRepository.save(user);

        return true;
    }

    /**
     * S3로 파일 업로드
     */
    public boolean uploadFiles(Long id, String fileType, MultipartFile multipartFile) {
        User user = userRepository.findById(id).orElseThrow(
            () -> new UserNotFoundException("" + id));

        // 업로드하는 파일 경로 만들기
        // getFolderName에서 폴더 이름을 만듬
        String uploadFilePath = fileType + "/" + getFolderName();

        log.debug("uploadFilePath :" + uploadFilePath);

        // 파일 이름을 가져와서
        String originalFileName = multipartFile.getOriginalFilename();

        // 파일이름을 기반으로 uuid로 변환하여 변수 생성 => 즉 uploadFileName은 uuid
        String uploadFileName = getUuidFileName(originalFileName);

        // 로컬에 파일을 저장하지 않고 업로드 하기
        ObjectMetadata objectMetadata = new ObjectMetadata();

        log.debug("objectMetadata = " + objectMetadata);

        // MediaType.IMAGE_PNG_VALUE  =>  multipartFile.getContentType() 이거랑 같다
        // 이때 꼭 png로만 들어오는게 아니기 때문에 multipartFile.getContentType() 를 사용한다.
        objectMetadata.setContentType(multipartFile.getContentType());
        objectMetadata.setContentLength(multipartFile.getSize());

        // 파일 저장 경로
        String keyName = uploadFilePath + "/" + uploadFileName; // ex) 구분/년/월/일/파일.확장자

        // try() 안에 있는 inputStream이 PutObjectRequest의 세번째에 들어가는 값
        try (InputStream inputStream = multipartFile.getInputStream()) {

            // S3에 폴더 및 파일 업로드
//                amazonS3Client.putObject(
//                    new PutObjectRequest(bucketName, keyName, inputStream, objectMetadata));

            // TODO : 외부에 공개하는 파일인 경우 Public Read 권한을 추가, ACL 확인
            amazonS3Client.putObject(
                new PutObjectRequest(bucketName, keyName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));

        } catch (IOException e) {
            e.printStackTrace();
            log.error("Filed upload failed", e);
            return false;
        }
        user.setImage(keyName);

        // DB에 저장한다.
        userRepository.save(user);

        return true;
    }

    /**
     * S3에 업로드된 파일 삭제
     */
    // uploadFileName은 uuidFileName 이다.
    public String deleteFile(String keyName) { // ex) 구분/년/월/일/파일.확장자

        String result = "success";

        try {

            // S3 버킷에 해당 파일 경로에 파일이 있는지 확인
            boolean isObjectExist = amazonS3Client.doesObjectExist(bucketName, keyName);
            if (isObjectExist) {
                amazonS3Client.deleteObject(bucketName, keyName);
            } else {
                result = "file not found";
            }
        } catch (Exception e) {
            log.debug("Delete File failed", e);
        }

        return result;
    }

    /**
     * UUID 파일명 반환
     */
    public String getUuidFileName(String fileName) {
        String ext = fileName.substring(fileName.indexOf(".") + 1);
        return UUID.randomUUID().toString() + "." + ext;
    }

    /**
     * 년/월/일 폴더명 반환
     */
    public String getFolderName() {
        // SimpleDateFormat을 사용하면 날짜를 원하는 형식으로 얻어 올 수 있다.
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
        System.out.println("sdf = " + sdf);
        Date date = new Date();
        System.out.println("date = " + date);
        String str = sdf.format(date);
        System.out.println("str = " + str);
        return str.replace("-", "/");
    }
}
