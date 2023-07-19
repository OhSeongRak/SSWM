package com.ground.sswm.auth.service;

import com.ground.sswm.auth.dto.JwtDto;
import com.ground.sswm.auth.dto.JwtUtil;
import com.ground.sswm.user.domain.User;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService{
    private JwtUtil jwtUtil;
    @Override
    public JwtDto createTokens(User user) {

        return null;
    }
}
