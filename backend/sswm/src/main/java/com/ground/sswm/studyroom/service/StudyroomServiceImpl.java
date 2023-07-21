package com.ground.sswm.studyroom.service;

import com.ground.sswm.studyroom.domain.Studyroom;
import com.ground.sswm.studyroom.domain.StudyroomRepository;
import com.ground.sswm.studyroom.dto.StudyroomDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudyroomServiceImpl implements StudyroomService {

  private final StudyroomRepository studyroomRepository;

  @Override
  @Transactional
  public Long add(StudyroomDto studyroomDto) {
    studyroomDto.setStudyAvgTime(0);
    Studyroom studyroom = Studyroom.from(studyroomDto);
    studyroomRepository.save(studyroom);

    return studyroom.getId();
  }

  @Override
  public List<StudyroomDto> list() {
    return null;
  }

  @Override
  @Transactional
  public void update(Long studyroomId, StudyroomDto studyroomDto) {
    Studyroom studyroom = studyroomRepository.findById(studyroomId).get();
    studyroom.setUpdates(studyroomDto);
  }

  @Override
  public StudyroomDto select(Long studyroomId) {
    Studyroom studyroom = studyroomRepository.findById(studyroomId).get();
    StudyroomDto studyroomDto = StudyroomDto.from(studyroom);
    return studyroomDto;
  }

  @Override
  @Transactional
  public void delete(Long studyroomId) {
    Studyroom studyroom = studyroomRepository.findById(studyroomId).get();
    studyroom.setDeleted(true);
  }

  @Override
  public boolean exists(String name) {
    return studyroomRepository.findByName(name).isPresent();
  }
}



