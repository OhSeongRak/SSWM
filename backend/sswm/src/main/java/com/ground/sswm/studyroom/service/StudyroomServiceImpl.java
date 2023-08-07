package com.ground.sswm.studyroom.service;

import com.ground.sswm.studyRoomTag.domain.StudyRoomTagRepository;
import com.ground.sswm.studyRoomTag.domain.StudyroomTag;
import com.ground.sswm.studyroom.domain.Studyroom;
import com.ground.sswm.studyroom.domain.StudyroomRepository;
import com.ground.sswm.studyroom.dto.SearchStudyroomReqDto;
import com.ground.sswm.studyroom.dto.SearchStudyroomResDto;
import com.ground.sswm.studyroom.dto.StudyroomDto;
import com.ground.sswm.tag.domain.TagRepository;
import com.ground.sswm.tag.dto.TagDto;
import com.ground.sswm.user.domain.User;
import com.ground.sswm.user.domain.UserRepository;
import com.ground.sswm.userStudyroom.domain.StudyMemberRole;
import com.ground.sswm.userStudyroom.domain.UserStudyroom;
import com.ground.sswm.userStudyroom.domain.UserStudyroomRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
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
    public List<SearchStudyroomResDto> list(SearchStudyroomReqDto searchStudyroomReqDto) {
        List<Studyroom> studyrooms;

        if (searchStudyroomReqDto.getTagNames().isEmpty()) {
            studyrooms = studyroomRepository.listNoTag(searchStudyroomReqDto.getSearchKeyword());
        } else {
            studyrooms = studyroomRepository.list(searchStudyroomReqDto.getTagNames(),
                searchStudyroomReqDto.getSearchKeyword());
        }

        List<SearchStudyroomResDto> searchStudyroomResDtos = new ArrayList<>();
        for (Studyroom studyroom : studyrooms) {
            SearchStudyroomResDto searchStudyroomResDto = new SearchStudyroomResDto();

            searchStudyroomResDto.setId(studyroom.getId());
            searchStudyroomResDto.setPublic(studyroom.isPublic());
            searchStudyroomResDto.setCode(studyroom.getEnterCode());
            searchStudyroomResDto.setImage(studyroom.getImage());
            searchStudyroomResDto.setName(studyroom.getName());
            searchStudyroomResDto.setUserNum(studyroom.getUserNum());
            searchStudyroomResDto.setMaxUserNum(studyroom.getMaxUserNum());
            searchStudyroomResDto.setCreatedTime(studyroom.getCreatedAt());
            searchStudyroomResDto.setStudyAvgTime(studyroom.getStudyAvgTime());
//            searchStudyroomResDto.setUserNum(userStudyroomRepository.countUserNum(studyroom.getId()));
            searchStudyroomResDto.setTagNames(tagRepository.findTags(studyroom.getId()));

            searchStudyroomResDtos.add(searchStudyroomResDto);
        }

        // 정렬
        String sortBy = searchStudyroomReqDto.getSortBy();
        String orderBy = searchStudyroomReqDto.getOrderBy();
        if (orderBy.equals("ASC")) {
            switch (sortBy) {
                case "STUDY_TIME":
                    searchStudyroomResDtos.sort(
                        (o1, o2) -> o1.getStudyAvgTime() - o2.getStudyAvgTime());
                    break;
                case "USER_NUM":
                    searchStudyroomResDtos.sort((o1, o2) -> o1.getUserNum() - o2.getUserNum());
                    break;
                case "CREATED":
                    searchStudyroomResDtos.sort(
                        (o1, o2) -> Math.toIntExact(o1.getCreatedTime() - o2.getCreatedTime()));
                    break;
            }
        } else {
            switch (sortBy) {
                case "STUDY_TIME":
                    searchStudyroomResDtos.sort(
                        (o1, o2) -> o2.getStudyAvgTime() - o1.getStudyAvgTime());
                    break;
                case "USER_NUM":
                    searchStudyroomResDtos.sort((o1, o2) -> o2.getUserNum() - o1.getUserNum());
                    break;
                case "CREATED":
                    searchStudyroomResDtos.sort(
                        (o1, o2) -> Math.toIntExact(o2.getCreatedTime() - o1.getCreatedTime()));
                    break;
            }
        }

        return searchStudyroomResDtos;
    }

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
        if (tagDtoList != null) {
            for (TagDto tagDto : tagDtoList) {
                StudyroomTag studyroomTag = new StudyroomTag();
                studyroomTag.setStudyroom(studyroom);
                studyroomTag.setTag(tagRepository.findByName(tagDto.getName()));
                studyRoomTagRepository.save(studyroomTag);
            }
        }

        return studyroom.getId();
    }


    @Override
    @Transactional
    public void update(Long studyroomId, StudyroomDto studyroomDto) {
        Studyroom studyroom = studyroomRepository.findById(studyroomId).get();
        studyroom.setUpdates(studyroomDto);
    }

    @Override
    public StudyroomDto select(Long studyroomId) {

        Optional<Studyroom> studyroom = studyroomRepository.findById(studyroomId);

        if (studyroom.isEmpty()) {
            return null;
        }

        StudyroomDto studyroomDto = StudyroomDto.from(studyroom.get());

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



