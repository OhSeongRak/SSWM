package com.ground.sswm.tag.service;

import com.ground.sswm.tag.model.dto.TagDto;
import java.util.List;

public interface TagService {

    List<TagDto> findAllTag();
}
