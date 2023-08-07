package com.ground.sswm.tag;

import com.ground.sswm.tag.model.dto.TagDto;
import com.ground.sswm.tag.service.TagService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/tags")
public class TagController {

    private final TagService tagService;

    @GetMapping
    public ResponseEntity<List<TagDto>> findAllTag() {

        List<TagDto> tagDtos = tagService.findAllTag();

        return new ResponseEntity<List<TagDto>>(tagDtos, HttpStatus.OK);
    }
}
