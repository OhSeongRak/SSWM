package com.ground.sswm.studyroom.service;


import com.ground.sswm.studyroom.dto.StudyroomDto;
import java.util.List;

public interface StudyroomService {

    Long add(Long userId, StudyroomDto studyroomDto);

    List<StudyroomDto> list();

    void update(Long studyroomId, StudyroomDto studyroomDto);

    StudyroomDto select(Long studyroomId);

    void delete(Long studyroomId);

    boolean exists(String name);
}
