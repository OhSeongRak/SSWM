package com.ground.sswm.tree.domain;

import com.ground.sswm.tree.dto.TreeDto;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Tree {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String image;

    @Builder
    public Tree(Long id, String name, String image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }

    public static Tree from(TreeDto treeDto) {
        return Tree.builder().id(treeDto.getId())
            .name(treeDto.getName()).image(treeDto.getImage())
            .build();
    }

}
