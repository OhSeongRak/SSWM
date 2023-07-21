package com.ground.sswm.auth.service;

import com.ground.sswm.auth.dto.OAuthTokenDto;
import com.ground.sswm.auth.dto.OAuthUserInfoDto;
import com.ground.sswm.auth.exception.KakaoAuthenticateException;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@Service
public class KakaoAuthService implements  SocialAuthService{
    private String KAKAO_TOKEN_REQUEST_URL="https://kauth.kakao.com/oauth/token";
    private String KAKAO_USER_INFO_REQUEST_URL = "https://kapi.kakao.com/v2/user/me";
    private String CLIENT_ID="a8cdfb7c6e1ce33857c1ff4df66c348c";
    private String CLIENT_SECRET="ViVXmJMU0xE6pgqJOTmdc8drLdj3n5BV";
    private String REDIRECT_URI="http://localhost:3000";
    @Autowired
    private RestTemplate restTemplate;


    @Override
    public OAuthTokenDto getToken(String code) {
        Map<String,Object> params = generateParams(code);
        log.debug("[GETTOKEN] "+params);
        JSONParser parser;
        JSONObject elem;
        try{
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(
                KAKAO_TOKEN_REQUEST_URL ,
                params, String.class);
            log.debug("[GETTOKEN2] "+responseEntity.getStatusCode());

            if(responseEntity.getStatusCode()!= HttpStatus.OK){
                log.debug("카카오 API 연결 실패 : code ={}",code);
                throw new KakaoAuthenticateException("[1] 카카오 서버와의 연결에 실패하였습니다.");
            }

            String responseBody = responseEntity.getBody();
            parser = new JSONParser();
            elem = (JSONObject) parser.parse(responseBody);
            log.debug("[DATA] "+elem);
            return OAuthTokenDto.builder()
                .token_type(elem.get("token_type").toString())
                .access_token(elem.get("access_token").toString())
                .expires_in(elem.get("expires_in").toString())
                .refresh_token(elem.get("refresh_token").toString())
                .scope(elem.get("scope").toString())
                .id_token(elem.get("id_token").toString())
                .build();

        } catch (ParseException e) {
            log.debug("JSON 파싱 실패 : {}", e.getMessage());
            throw new KakaoAuthenticateException("요청에 인가 코드가 존재하지 않습니다.");
        } catch (Exception e) {
            log.debug("카카오 API 연결 실패: {}", code);
            throw new KakaoAuthenticateException("[2] 카카오 서버와의 연결에 실패하였습니다.");
        }
    }

    @Override
    public OAuthUserInfoDto getUserInfo(OAuthTokenDto dto) {
        String requestUrl = UriComponentsBuilder.fromHttpUrl(KAKAO_USER_INFO_REQUEST_URL)
            .toUriString();
        String userInfoFromProvider;
        try {
            userInfoFromProvider = restTemplate.getForObject(requestUrl, String.class);
            JSONParser parser = new JSONParser();
            JSONObject userInfo = (JSONObject) parser.parse(userInfoFromProvider);

            return OAuthUserInfoDto.builder()
                .email(userInfo.get("email").toString())
                .name(userInfo.get("name").toString())
                .profileImg(userInfo.get("picture").toString())
                .providerId(userInfo.get("sub").toString())
                .build();

        } catch (ParseException e) {
            log.debug("파싱 실패: {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }
    private Map<String, Object> generateParams(String code) {
        Map<String, Object> params = new HashMap<>();
        params.put("grant_type", "authorization_code");
        params.put("client_id", CLIENT_ID);
        params.put("client_secret", CLIENT_SECRET);
        params.put("redirect_uri", REDIRECT_URI);
        params.put("code", code);
        return params;
    }
}
