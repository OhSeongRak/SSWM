package com.ground.sswm.auth.service;

import com.ground.sswm.auth.domain.Auth;
import com.ground.sswm.auth.domain.AuthRepository;
import com.ground.sswm.auth.dto.JwtDto;
import com.ground.sswm.auth.jwt.JwtUtil;
import com.ground.sswm.user.domain.User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {
    private JwtUtil jwtUtil;
    private AuthRepository authRepository;

    public AuthServiceImpl(JwtUtil jwtUtil, AuthRepository authRepository) {
        this.jwtUtil = jwtUtil;
        this.authRepository = authRepository;
    }

    @Override
    public JwtDto createTokens(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getId());
        claims.put("email", user.getEmail());
        //claims.put("name", user.getName());
        //claims.put("nickname", user.getNickname());
        claims.put("isAdmin", user.getIsAdmin());
        String accessToken = jwtUtil.generateToken("access-token", claims, 1000 * 60 * 60 * 1);//1시간
        String refreshToken = jwtUtil.generateToken("refresh-token", claims, 1000 * 60 * 60 * 10); // DB에 넣어서 관리
        return new JwtDto(accessToken, refreshToken);
    }

    @Override
    public Map<String, Object> getClaimsFromToken(String token) {
        return jwtUtil.getClaims(token);
    }

    @Override
    public Auth getSavedTokenByUserId(Long userId) {
        return authRepository.findByUserId(userId);
    }

    @Override
    public String createAccessToken(Map<String, Object> claims) {
        return jwtUtil.generateToken("access-token", claims, 1000 * 60 * 60 * 1);
    }

    @Override
    public void saveTokens(Long userId, JwtDto jwtDto) {
        Auth newTokens = Auth.builder()
                .userId(userId)
                .accessToken(jwtDto.getAccessToken())
                .refreshToken(jwtDto.getRefreshToken())
                .build();
        authRepository.save(newTokens); // userId가 존재시, update token
    }

    @Override
    public void updateTokens(Auth saved) {
        authRepository.save(saved);
    }

}
