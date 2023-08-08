package com.ground.sswm.studyroom.service;


import com.ground.sswm.studyroom.model.dto.SearchStudyroomReqDto;
import com.ground.sswm.studyroom.model.dto.SearchStudyroomResDto;
import com.ground.sswm.studyroom.model.dto.StudyroomDto;
import java.util.List;

public interface StudyroomService {

    List<SearchStudyroomResDto> list(SearchStudyroomReqDto searchStudyroomReqDto);

    Long add(Long userId, StudyroomDto studyroomDto);

    void update(Long studyroomId, StudyroomDto studyroomDto);

    StudyroomDto selectByStudyroomId(Long studyroomId);

    List<SearchStudyroomResDto> selectByUserId(Long userId);
    void delete(Long studyroomId);

    boolean exists(String name);


}
