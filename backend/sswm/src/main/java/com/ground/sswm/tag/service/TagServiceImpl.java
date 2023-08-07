package com.ground.sswm.tag.service;

import com.ground.sswm.tag.model.Tag;
import com.ground.sswm.tag.model.dto.TagDto;
import com.ground.sswm.tag.repository.TagRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public List<TagDto> findAllTag() {
        List<Tag> tags = tagRepository.findAll();

        List<TagDto> tagDtos = new ArrayList<>();

        for (Tag tag : tags) {
            TagDto tagDto = TagDto.from(tag);
            tagDtos.add(tagDto);
        }

        return tagDtos;
    }
}
