package com.ground.sswm.studyroom.controller;


import com.ground.sswm.studyroom.dto.StudyroomDto;
import com.ground.sswm.studyroom.service.StudyroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/studyrooms")
public class StudyroomController {
  private StudyroomService studyroomService;


}
