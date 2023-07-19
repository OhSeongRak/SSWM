package com.ground.sswm.auth.service;

import com.ground.sswm.auth.dto.JwtDto;
import com.ground.sswm.user.domain.User;

public interface AuthService {

    JwtDto createTokens(User user);
}
