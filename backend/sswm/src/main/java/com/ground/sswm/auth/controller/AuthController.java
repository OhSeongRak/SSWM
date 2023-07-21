package com.ground.sswm.auth.controller;

import com.ground.sswm.auth.domain.Auth;
import com.ground.sswm.auth.oauth.GoogleUserInfo;
import com.ground.sswm.auth.dto.JwtDto;
import com.ground.sswm.auth.oauth.OAuthProvider;
import com.ground.sswm.auth.dto.OAuthTokenDto;
import com.ground.sswm.auth.oauth.OAuthUserInfo;
import com.ground.sswm.auth.dto.OAuthUserInfoDto;
import com.ground.sswm.auth.exception.InvalidTokenException;
import com.ground.sswm.auth.exception.UserUnAuthorizedException;
import com.ground.sswm.auth.service.AuthService;
import com.ground.sswm.auth.service.GoogleAuthService;
import com.ground.sswm.auth.service.SocialAuthService;
import com.ground.sswm.user.domain.User;
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
    private final AuthService authService;

    @PostMapping("/{SOCIAL_TYPE}")
    public ResponseEntity<JwtDto> loginOrRegister(@RequestBody Map<String, Object> data,
        @PathVariable("SOCIAL_TYPE") String socialType) {
        log.debug("[POST] /auth/" + socialType);
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
            // TODO : kakao Login
        }

        // provider 랑 providerId로 User 있는지 확인
        User userEntity = userService.getUserByProviderId(oauthUser.getProvider(),
            oauthUser.getProviderId());
        if (userEntity == null) { // 새로운 유저 -> User 테이블에 저장
            userEntity = userService.addOAuthUser(oauthUser);
        }
        JwtDto jwtDto = authService.createTokens(userEntity);
        Auth authEntity = authService.getSavedTokenByUserId(userEntity.getId());
        if (authEntity == null) { // 새로운 유저 -> Auth 테이블에 저장
            authService.saveTokens(userEntity.getId(), jwtDto);
        } else { // 기존 유저 -> Auth 테이블의 Token update
            authEntity.setRefreshToken(jwtDto.getRefreshToken());
            authEntity.setAccessToken(jwtDto.getAccessToken());
            authService.updateTokens(authEntity);
        }
        return new ResponseEntity<>(jwtDto, HttpStatus.OK);
    }

    @PostMapping("/refresh-access-token")
    public ResponseEntity<JwtDto> refreshToken(@RequestHeader("refresh-token") String refreshToken)
        throws InvalidTokenException {
        log.debug("[POST] /refresh-access-token " + refreshToken);
        Map<String, Object> claims = authService.getClaimsFromToken(refreshToken);
        Auth saved = authService.getSavedTokenByUserId((Long) claims.get("id"));
        if (refreshToken.equals(saved.getRefreshToken())) {
            String accessToken = authService.createAccessToken(claims);
            saved.setAccessToken(accessToken);
            authService.updateTokens(saved);
            JwtDto generated = JwtDto.builder().refreshToken(saved.getRefreshToken())
                .accessToken(saved.getAccessToken()).build();
            return new ResponseEntity<>(generated, HttpStatus.OK);
        }
        throw new InvalidTokenException("RefreshToken 이상함");
    }

}
