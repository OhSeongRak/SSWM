package com.ground.sswm.tree.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Tree {
    @Id
    @GeneratedValue
    private Integer id;

    private String name;
    private String image;

}
