package com.ground.sswm.studyroom.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QStudyroom is a Querydsl query type for Studyroom
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStudyroom extends EntityPathBase<Studyroom> {

    private static final long serialVersionUID = -2038881214L;

    public static final QStudyroom studyroom = new QStudyroom("studyroom");

    public final NumberPath<Integer> createdAt = createNumber("createdAt", Integer.class);

    public final StringPath enterCode = createString("enterCode");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    public final BooleanPath isPublic = createBoolean("isPublic");

    public final NumberPath<Integer> maxRestTime = createNumber("maxRestTime", Integer.class);

    public final NumberPath<Integer> maxUserNum = createNumber("maxUserNum", Integer.class);

    public final StringPath name = createString("name");

    public final StringPath notice = createString("notice");

    public final NumberPath<Integer> studyAvgTime = createNumber("studyAvgTime", Integer.class);

    public final NumberPath<Integer> userNum = createNumber("userNum", Integer.class);

    public QStudyroom(String variable) {
        super(Studyroom.class, forVariable(variable));
    }

    public QStudyroom(Path<? extends Studyroom> path) {
        super(path.getType(), path.getMetadata());
    }

    public QStudyroom(PathMetadata metadata) {
        super(Studyroom.class, metadata);
    }

}

