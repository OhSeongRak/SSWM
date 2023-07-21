package com.ground.sswm.studyroom.controller;


import com.ground.sswm.studyroom.domain.Studyroom;
import com.ground.sswm.studyroom.dto.StudyroomDto;
import com.ground.sswm.studyroom.service.StudyroomService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/studyrooms")
public class StudyroomController {
  private final StudyroomService studyroomService;

  // 전체 조회
  @GetMapping
  @ResponseBody
  public ResponseEntity<List<StudyroomDto>> list() {
    List<StudyroomDto> studyrooms = studyroomService.list();
    return new ResponseEntity<List<StudyroomDto>>(studyrooms, HttpStatus.OK);
  }

  // 스터디룸 생성
  @PostMapping
  @ResponseBody
  public ResponseEntity<Long> add(@RequestBody StudyroomDto studyroomDto) {
    Long studyroomId = studyroomService.add(studyroomDto);
    return new ResponseEntity<Long>(studyroomId, HttpStatus.OK);
  }

  // 스터디룸 수정
  @PutMapping("/{studyroomId}")
  @ResponseBody
  public ResponseEntity<Void> update(@PathVariable("studyroomId") Long studyroomId, @RequestBody StudyroomDto studyroomDto) {
    studyroomService.update(studyroomId, studyroomDto);
    return new ResponseEntity<Void>(HttpStatus.OK);
  }

  @DeleteMapping("/{studyroomId}")
  @ResponseBody
  public ResponseEntity<Void> delete(@PathVariable("studyroomId") Long studyroomId) {
    studyroomService.delete(studyroomId);
    return new ResponseEntity<Void>(HttpStatus.OK);
  }

  // id로 스터디룸 조회
  @GetMapping("/{studyroomId}")
  @ResponseBody
  public ResponseEntity<StudyroomDto> getStudyroom(@PathVariable ("studyroomId") Long studyroomId) {
    StudyroomDto studyroom = studyroomService.getStudyroom(studyroomId);
    return new ResponseEntity<StudyroomDto>(studyroom, HttpStatus.OK);
  }

  // 룸 제목 중복확인
  @GetMapping("/exists")
  @ResponseBody
  public ResponseEntity<Void> exists(@RequestBody StudyroomDto studyroomDto) {
    Studyroom studyroom = studyroomService.exists(studyroomDto.getName());
    if (studyroom == null)
      return new ResponseEntity<Void>(HttpStatus.OK);
    else
      return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
  }
}
