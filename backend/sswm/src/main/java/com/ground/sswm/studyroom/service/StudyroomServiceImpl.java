package com.ground.sswm.studyroom.service;

import com.ground.sswm.studyroom.domain.StudyroomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudyroomServiceImpl implements StudyroomService {

  private StudyroomRepository studyroomRepository;

}
