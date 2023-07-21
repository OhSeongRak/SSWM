package com.ground.sswm.tag.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
public class Tag {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

}
