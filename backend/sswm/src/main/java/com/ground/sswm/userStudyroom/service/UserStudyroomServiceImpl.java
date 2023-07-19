package com.ground.sswm.userStudyroom.service;

import com.ground.sswm.userStudyroom.domain.UserStudyroom;
import com.ground.sswm.userStudyroom.domain.UserStudyroomRepository;
import com.ground.sswm.userStudyroom.dto.UserStudyroomDto;
import org.springframework.stereotype.Service;

@Service
public class UserStudyroomServiceImpl implements UserStudyroomService {

  private UserStudyroomRepository userStudyroomRepository;

  public UserStudyroomServiceImpl(UserStudyroomRepository userStudyroomRepository) {
    this.userStudyroomRepository = userStudyroomRepository;
  }

}
