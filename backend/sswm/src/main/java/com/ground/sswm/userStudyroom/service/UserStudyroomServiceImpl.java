package com.ground.sswm.userStudyroom.service;

import com.ground.sswm.userStudyroom.domain.UserStudyroom;
import com.ground.sswm.userStudyroom.domain.StudyroomRepository;
import com.ground.sswm.userStudyroom.dto.StudyroomDto;
import org.springframework.stereotype.Service;

@Service
public class StudyroomServiceImpl implements StudyroomService {

  private StudyroomRepository studyroomRepository;

  public StudyroomServiceImpl(StudyroomRepository studyroomRepository) {
    this.studyroomRepository = studyroomRepository;
  }

  @Override
  public void add(StudyroomDto studyroomDto) {
    UserStudyroom userStudyroom = UserStudyroom.from(studyroomDto);
    studyroomRepository.save(userStudyroom);
  }
}
