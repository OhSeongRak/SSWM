package com.ground.sswm.studyRoomTag.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStudyroomTag is a Querydsl query type for StudyroomTag
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStudyroomTag extends EntityPathBase<StudyroomTag> {

    private static final long serialVersionUID = -1002125690L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStudyroomTag studyroomTag = new QStudyroomTag("studyroomTag");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.ground.sswm.studyroom.domain.QStudyroom studyroom;

    public final com.ground.sswm.tag.domain.QTag tag;

    public QStudyroomTag(String variable) {
        this(StudyroomTag.class, forVariable(variable), INITS);
    }

    public QStudyroomTag(Path<? extends StudyroomTag> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStudyroomTag(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStudyroomTag(PathMetadata metadata, PathInits inits) {
        this(StudyroomTag.class, metadata, inits);
    }

    public QStudyroomTag(Class<? extends StudyroomTag> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.studyroom = inits.isInitialized("studyroom") ? new com.ground.sswm.studyroom.domain.QStudyroom(forProperty("studyroom")) : null;
        this.tag = inits.isInitialized("tag") ? new com.ground.sswm.tag.domain.QTag(forProperty("tag")) : null;
    }

}

