package com.ground.sswm.tree.model.dto;

import com.ground.sswm.tree.model.Tree;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TreeDto {

    private Long id;
    private String name;
    private String image;

    @Builder
    public TreeDto(Long id, String name, String image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }

    public static TreeDto from(Tree tree) {
        return TreeDto.builder().id(tree.getId())
            .name(tree.getName()).image(tree.getImage())
            .build();
    }
}
