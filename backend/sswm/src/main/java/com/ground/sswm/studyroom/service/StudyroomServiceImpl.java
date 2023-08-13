package com.ground.sswm.studyroom.service;

import com.ground.sswm.image.util.FileManageUtil;
import com.ground.sswm.studyroom.model.Studyroom;
import com.ground.sswm.studyroom.model.StudyroomTag;
import com.ground.sswm.studyroom.model.dto.SearchStudyroomReqDto;
import com.ground.sswm.studyroom.model.dto.SearchStudyroomResDto;
import com.ground.sswm.studyroom.model.dto.StudyroomDto;
import com.ground.sswm.studyroom.repository.StudyRoomTagRepository;
import com.ground.sswm.studyroom.repository.StudyroomRepository;
import com.ground.sswm.tag.model.dto.TagDto;
import com.ground.sswm.tag.repository.TagRepository;
import com.ground.sswm.user.model.User;
import com.ground.sswm.user.repository.UserRepository;
import com.ground.sswm.userStudyroom.model.StudyMemberRole;
import com.ground.sswm.userStudyroom.model.UserStudyroom;
import com.ground.sswm.userStudyroom.repository.UserStudyroomRepository;
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
    private final FileManageUtil fileManageUtil;

    @Override
    public List<SearchStudyroomResDto> list(SearchStudyroomReqDto searchStudyroomReqDto) {

        List<Studyroom> studyrooms;
        boolean isPublic = searchStudyroomReqDto.getIsPublic();
        List<String> tagNames = searchStudyroomReqDto.getTagNames();
        String searchKeyword = searchStudyroomReqDto.getSearchKeyword();

        if (isPublic) { // 공개만 표시
            if (tagNames.isEmpty()) // 태그 선택 x
            {
                studyrooms = studyroomRepository.listPublic(searchKeyword);
            } else // 태그 선택 o
            {
                studyrooms = studyroomRepository.listTagPublic(tagNames, searchKeyword);
            }
        } else { // 비공개도 표시
            if (tagNames.isEmpty()) // 태그 선택 x
            {
                studyrooms = studyroomRepository.list(searchKeyword);
            } else // 태그 선택 o
            {
                studyrooms = studyroomRepository.listTag(tagNames, searchKeyword);
            }
        }

        List<SearchStudyroomResDto> searchStudyroomResDtos = new ArrayList<>();
        for (Studyroom studyroom : studyrooms) {
            SearchStudyroomResDto searchStudyroomResDto = SearchStudyroomResDto.from(studyroom);
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
        studyroomDto.setCreatedAt(System.currentTimeMillis() / 1000);
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
    public void update(Long studyroomId, StudyroomDto studyroomDto, String imagePath) {
        Studyroom studyroom = studyroomRepository.findById(studyroomId).get();

        // 이미지 바꾸는 경우
        if (imagePath != null && !imagePath.isBlank()) {
//            log.debug("[modifyUser] (1)");
//            if (studyroomDto.getImage() != null && !studyroomDto.getImage().isBlank()) {
//                // 기존 이미지 삭제
//                log.debug("[modifyUser] (2)");
//                fileManageUtil.deleteFile(studyroomDto.getImage());
//            }
            log.debug("[modifyUser] (3)");
            studyroomDto.setImage(imagePath);
        }

        // INSERT StudyRoomTag
        List<TagDto> tagDtoList = studyroomDto.getTags();
        for (TagDto tagDto : tagDtoList) {
            StudyroomTag studyroomTag = new StudyroomTag();
            studyroomTag.setStudyroom(studyroom);
            studyroomTag.setTag(tagRepository.findByName(tagDto.getName()));
            studyRoomTagRepository.save(studyroomTag);
        }

        studyroom.setUpdates(studyroomDto);
    }


    @Override
    public StudyroomDto selectByStudyroomId(Long studyroomId) {

        Optional<Studyroom> studyroom = studyroomRepository.findById(studyroomId);

        if (studyroom.isEmpty()) {
            return null;
        }

        StudyroomDto studyroomDto = StudyroomDto.from(studyroom.get());

        return studyroomDto;
    }

    @Override
    public List<SearchStudyroomResDto> selectByUserId(Long userId) {
        List<Studyroom> studyrooms = studyroomRepository.findByUserId(userId);

        List<SearchStudyroomResDto> searchStudyroomResDtoList = new ArrayList<>();
        for (Studyroom studyroom : studyrooms) {
            SearchStudyroomResDto searchStudyroomResDto = SearchStudyroomResDto.from(studyroom);
            searchStudyroomResDto.setTagNames(tagRepository.findTags(studyroom.getId()));

            searchStudyroomResDtoList.add(searchStudyroomResDto);
        }
        return searchStudyroomResDtoList;
    }

    @Override
    @Transactional
    public void delete(Long studyroomId, boolean isDelete) {
        Studyroom studyroom = studyroomRepository.findById(studyroomId).get();
        studyroom.setDeleted(isDelete);
    }

    @Override
    public boolean exists(String name) {
        return studyroomRepository.findByName(name).isPresent();
    }

    @Override
    public boolean checkEnterCode(Long studyroomId, String enterCode) {
        Studyroom studyroom = studyroomRepository.findByIdAndEnterCode(studyroomId, enterCode);
        return (studyroom == null) ? false : true;
    }

}



