package com.ground.sswm.auth.service;

import com.ground.sswm.auth.jwt.model.JwtDto;
import com.ground.sswm.auth.model.Auth;
import com.ground.sswm.user.model.User;
import java.util.Map;

public interface AuthService {

    JwtDto createTokens(User user);

    Long getUserIdFromToken(String token);

    Map<String, Object> getClaimsFromToken(String token);

    Auth getSavedTokenByUserId(Long id);

    String createAccessToken(Map<String, Object> claims);

    void saveTokens(Long id, JwtDto jwtDto);

    void updateTokens(Auth saved);
}
