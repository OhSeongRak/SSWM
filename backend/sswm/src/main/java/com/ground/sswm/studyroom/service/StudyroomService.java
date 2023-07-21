package com.ground.sswm.studyroom.service;


import com.ground.sswm.studyroom.domain.Studyroom;
import com.ground.sswm.studyroom.dto.StudyroomDto;
import java.util.List;

public interface StudyroomService {

    Long add(StudyroomDto studyroomDto);

    List<StudyroomDto> list();

    void update(Long studyroomId, StudyroomDto studyroomDto);

    StudyroomDto getStudyroom(Long studyroomId);

    void delete(Long studyroomId);

    Studyroom exists(String name);
}
