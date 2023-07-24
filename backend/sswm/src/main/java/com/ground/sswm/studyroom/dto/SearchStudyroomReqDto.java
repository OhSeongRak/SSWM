package com.ground.sswm.studyroom.dto;

import com.ground.sswm.tag.dto.TagDto;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class SearchStudyroomReqDto {
    private String sortBy;
    private String orderBy;
    private String searchKeyword;
    private List<String> tagNames;
    private boolean showFull;
    private boolean showPrivate;
}
