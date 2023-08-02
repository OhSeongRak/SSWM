package com.ground.sswm.tag.dto;

import com.ground.sswm.studyroom.domain.Studyroom;
import com.ground.sswm.studyroom.dto.StudyroomDto;
import com.ground.sswm.tag.domain.Tag;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class TagDto {

    private Long id;
    private String name;

    @Builder
    public TagDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public static TagDto from(Tag tag) {
        return TagDto.builder()
            .id(tag.getId())
            .name(tag.getName())
            .build();
    }
}
