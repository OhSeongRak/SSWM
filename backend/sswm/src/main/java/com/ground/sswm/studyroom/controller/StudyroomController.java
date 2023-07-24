package com.ground.sswm.studyroom.controller;


import com.ground.sswm.studyroom.service.StudyroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/studyrooms")
public class StudyroomController {
  private StudyroomService studyroomService;


}
