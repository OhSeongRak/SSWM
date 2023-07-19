package com.ground.sswm.auth.service;

import com.ground.sswm.auth.dto.OAuthTokenDto;
import com.ground.sswm.auth.dto.OAuthUserInfoDto;
import com.ground.sswm.auth.exception.GoogleAuthenticateException;

import java.util.HashMap;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@Service
public class GoogleAuthService implements SocialAuthService {
    private String GOOGLE_TOKEN_REQUEST_URL="https://oauth2.googleapis.com";
    private String CLIENT_ID="508793857526-hjnar37f3fdnjsopr7lv7dfgkf972p5h.apps.googleusercontent.com";
    private String CLIENT_SECRET="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";
    private String REDIRECT_URI="http://localhost:3000";
    @Autowired
    private RestTemplate restTemplate;


    @Override
    public OAuthTokenDto getToken(String code) { // 인가코드로 토큰 받기
        Map<String, Object> params = generateParams(code);

        JSONParser parser;
        JSONObject elem;
        try {
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(GOOGLE_TOKEN_REQUEST_URL + "/token",
                    params, String.class);
            if (responseEntity.getStatusCode() != HttpStatus.OK) {
                log.debug("구글 API 연결 실패 : code = {}", code);
                throw new GoogleAuthenticateException("[1] 구글 서버와의 연결에 실패하였습니다.");
            }

            String responseBody = responseEntity.getBody();
            parser = new JSONParser();
            elem = (JSONObject) parser.parse(responseBody);
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
            throw new GoogleAuthenticateException("요청에 인가 코드가 존재하지 않습니다.");
        } catch (Exception e) {
            log.debug("구글 API 연결 실패: {}", code);
            throw new GoogleAuthenticateException("[2] 구글 서버와의 연결에 실패하였습니다.");
        }
    }

    @Override
    public OAuthUserInfoDto getUserInfo(OAuthTokenDto dto) {
        String idToken = dto.getId_token();
        String requestUrl = UriComponentsBuilder.fromHttpUrl(GOOGLE_TOKEN_REQUEST_URL + "/tokeninfo")
                .queryParam("id_token", idToken).toUriString();
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
        params.put("code", code);
        params.put("client_id", CLIENT_ID);
        params.put("client_secret", CLIENT_SECRET);
        params.put("redirect_uri", REDIRECT_URI);
        return params;
    }


}
