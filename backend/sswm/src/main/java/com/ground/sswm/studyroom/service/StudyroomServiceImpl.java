package com.ground.sswm.studyroom.service;

import com.ground.sswm.studyRoomTag.domain.StudyRoomTagRepository;
import com.ground.sswm.studyRoomTag.domain.StudyroomTag;
import com.ground.sswm.studyroom.domain.Studyroom;
import com.ground.sswm.studyroom.domain.StudyroomRepository;
import com.ground.sswm.studyroom.dto.StudyroomDto;
import com.ground.sswm.tag.domain.Tag;
import com.ground.sswm.tag.domain.TagRepository;
import com.ground.sswm.tag.dto.TagDto;
import com.ground.sswm.user.domain.User;
import com.ground.sswm.user.domain.UserRepository;
import com.ground.sswm.userStudyroom.domain.StudyMemberRole;
import com.ground.sswm.userStudyroom.domain.UserStudyroom;
import com.ground.sswm.userStudyroom.domain.UserStudyroomRepository;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudyroomServiceImpl implements StudyroomService {

  private final StudyroomRepository studyroomRepository;
  private final UserStudyroomRepository userStudyroomRepository;
  private final UserRepository userRepository;
  private final StudyRoomTagRepository studyRoomTagRepository;
  private final TagRepository tagRepository;


  @Override
  @Transactional
  public Long add(Long userId, StudyroomDto studyroomDto) {
//    studyroomDto.setStudyAvgTime(0);
    // INSERT Studyroom
    Studyroom studyroom = Studyroom.from(studyroomDto);
    studyroomRepository.save(studyroom);

    // User 가져오기
    User user = userRepository.findById(userId).get();

    // INSERT UserSudyroom
    UserStudyroom userStudyroom = new UserStudyroom();
    userStudyroom.setRole(StudyMemberRole.HOST);
    userStudyroom.setBan(false);
    userStudyroom.setDeleted(false);
    userStudyroom.setTotalStudy(0);
    userStudyroom.setTotalRest(0);
    userStudyroom.setUser(user);
    userStudyroom.setStudyroom(studyroom);
    userStudyroomRepository.save(userStudyroom);

    // INSERT StudyRoomTag
    List<TagDto> tagDtoList = studyroomDto.getTags();
    for (TagDto tagDto : tagDtoList) {
      StudyroomTag studyroomTag = new StudyroomTag();
      studyroomTag.setStudyroom(studyroom);
      studyroomTag.setTag(tagRepository.findByName(tagDto.getName()));
      studyRoomTagRepository.save(studyroomTag);
    }

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



