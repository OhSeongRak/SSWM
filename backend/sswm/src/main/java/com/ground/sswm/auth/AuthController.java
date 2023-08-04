package com.ground.sswm.auth;

import com.ground.sswm.auth.domain.Auth;
import com.ground.sswm.auth.dto.JwtDto;
import com.ground.sswm.auth.dto.OAuthTokenDto;
import com.ground.sswm.auth.dto.OAuthUserInfoDto;
import com.ground.sswm.auth.exception.InvalidTokenException;
import com.ground.sswm.auth.exception.UserAlreadyExistException;
import com.ground.sswm.auth.exception.UserUnAuthorizedException;
import com.ground.sswm.auth.oauth.GoogleUserInfo;
import com.ground.sswm.auth.oauth.KakaoUserInfo;
import com.ground.sswm.auth.oauth.OAuthProvider;
import com.ground.sswm.auth.oauth.OAuthUserInfo;
import com.ground.sswm.auth.oauth.service.GoogleAuthService;
import com.ground.sswm.auth.oauth.service.KakaoAuthService;
import com.ground.sswm.auth.oauth.service.SocialAuthService;
import com.ground.sswm.auth.service.AuthService;
import com.ground.sswm.user.domain.User;
import com.ground.sswm.user.exception.UserNotFoundException;
import com.ground.sswm.user.service.UserService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final GoogleAuthService googleAuthService;
    private final KakaoAuthService kakaoAuthService;
    private final AuthService authService;

    @PostMapping("/{SOCIAL_TYPE}/login") //login
    public ResponseEntity<JwtDto> login( @RequestBody Map<String, Object> data,
        @PathVariable("SOCIAL_TYPE") String socialType) {

        log.debug("[POST] /auth/" + socialType + "/login");
        // 회원가입 -> code 받아와서 회원 정보 요청 보내고, (신규사용자) 데이터베이스 정보 저장 후, sswm 만의 토큰 발급
        // 로그인 -> code 받아와서 회원 정보 요청 보내고, 데이터베이스 정보 확인해서,  sswm 만의 토큰 발급
        String authorizationCode = (String) data.get("code");
        log.debug("AuthorizationCode: {}", authorizationCode);

        if (authorizationCode == null) {
            log.debug("인가 코드 없음");
            throw new UserUnAuthorizedException("인가코드없음");
        }

        SocialAuthService socialAuthService;
        OAuthTokenDto oAuthTokenDto;
        OAuthUserInfo oauthUser = null;
        OAuthUserInfoDto userInitialInfo;
        if (socialType.equals(OAuthProvider.GOOGLE.getProvider())) {
            socialAuthService = googleAuthService;
            oAuthTokenDto = socialAuthService.getToken(authorizationCode);
            userInitialInfo = socialAuthService.getUserInfo(oAuthTokenDto);
            oauthUser = new GoogleUserInfo(userInitialInfo);
        } else if (socialType.equals(OAuthProvider.KAKAO.getProvider())) {
            socialAuthService = kakaoAuthService;
            oAuthTokenDto = socialAuthService.getToken(authorizationCode);
            userInitialInfo = socialAuthService.getUserInfo(oAuthTokenDto);
            oauthUser = new KakaoUserInfo(userInitialInfo);
        }

        // provider 랑 providerId로 User 있는지 확인
        User userEntity = userService.getUserByProviderId(oauthUser.getProvider(),
            oauthUser.getProviderId());

        // 유저가 존재해야 함
        if (userEntity == null) {
            throw new UserNotFoundException("유저가 존재하지 않습니다");
        }

        JwtDto jwtDto = authService.createTokens(userEntity);
        Auth authEntity = authService.getSavedTokenByUserId(userEntity.getId());
        if (authEntity != null) {// 기존 유저 -> Auth 테이블의 Token update
            authEntity.setRefreshToken(jwtDto.getRefreshToken());
            authService.updateTokens(authEntity);
        }
        return new ResponseEntity<>(jwtDto, HttpStatus.OK);
    }

    @PostMapping("/{SOCIAL_TYPE}/signin") // signin
    public ResponseEntity<JwtDto> signin(@RequestBody Map<String, Object> data,
        @PathVariable("SOCIAL_TYPE") String socialType) {
        log.debug("[POST] /auth/" + socialType + "/signin");
        // 회원가입 -> code 받아와서 회원 정보 요청 보내고, (신규사용자) 데이터베이스 정보 저장 후, sswm 만의 토큰 발급
        // 로그인 -> code 받아와서 회원 정보 요청 보내고, 데이터베이스 정보 확인해서,  sswm 만의 토큰 발급
        String authorizationCode = (String) data.get("code");
        log.debug("AuthorizationCode: {}", authorizationCode);

        if (authorizationCode == null) {
            log.debug("인가 코드 없음");
            throw new UserUnAuthorizedException("인가코드없음");
        }

        SocialAuthService socialAuthService;
        OAuthTokenDto oAuthTokenDto;
        OAuthUserInfo oauthUser = null;
        OAuthUserInfoDto userInitialInfo;
        if (socialType.equals(OAuthProvider.GOOGLE.getProvider())) {
            socialAuthService = googleAuthService;
            oAuthTokenDto = socialAuthService.getToken(authorizationCode);
            userInitialInfo = socialAuthService.getUserInfo(oAuthTokenDto);
            oauthUser = new GoogleUserInfo(userInitialInfo);
        } else if (socialType.equals(OAuthProvider.KAKAO.getProvider())) {
            socialAuthService = kakaoAuthService;
            oAuthTokenDto = socialAuthService.getToken(authorizationCode);
            userInitialInfo = socialAuthService.getUserInfo(oAuthTokenDto);
            oauthUser = new KakaoUserInfo(userInitialInfo);
        }

        // provider 랑 providerId로 User 있는지 확인
        User userEntity = userService.getUserByProviderId(oauthUser.getProvider(),
            oauthUser.getProviderId());

        // 유저가 존재하면 안됨
        if (userEntity != null) {
            throw new UserAlreadyExistException("이미 유저가 존재합니다");
        }

        userEntity = userService.addOAuthUser(oauthUser); // 회원 가입 진행

        JwtDto jwtDto = authService.createTokens(userEntity);

        Auth authEntity = authService.getSavedTokenByUserId(userEntity.getId());

        if (authEntity == null) { // 새로운 유저 -> Auth 테이블에 저장
            authService.saveTokens(userEntity.getId(), jwtDto);
        }
        return new ResponseEntity<>(jwtDto, HttpStatus.OK);
    }

    @PostMapping("/access-token")
    public ResponseEntity<?> accessToken(@RequestHeader("Authorization") String accessToken)
        throws InvalidTokenException {
        log.debug("[POST] /access-token " + accessToken);


        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/refresh-access-token")
    public ResponseEntity<JwtDto> refreshToken(@RequestHeader("Authorization") String refreshToken)
        throws InvalidTokenException {
        log.debug("[POST] /refresh-access-token " + refreshToken);
        Map<String, Object> claims = authService.getClaimsFromToken(refreshToken);
        Auth saved = authService.getSavedTokenByUserId(Long.valueOf(claims.get("id").toString()));
        if (refreshToken.equals(saved.getRefreshToken())) {
            String accessToken = authService.createAccessToken(claims);
            authService.updateTokens(saved);
            JwtDto generated = JwtDto.builder().refreshToken(saved.getRefreshToken())
                .accessToken(accessToken)
                .build();
            return new ResponseEntity<>(generated, HttpStatus.OK);
        }
        throw new InvalidTokenException("RefreshToken 만료됨");
    }

}
