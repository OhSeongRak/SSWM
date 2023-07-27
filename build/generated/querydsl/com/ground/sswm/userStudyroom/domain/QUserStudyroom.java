package com.ground.sswm.userStudyroom.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserStudyroom is a Querydsl query type for UserStudyroom
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserStudyroom extends EntityPathBase<UserStudyroom> {

    private static final long serialVersionUID = 294015330L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserStudyroom userStudyroom = new QUserStudyroom("userStudyroom");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isBan = createBoolean("isBan");

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    public final EnumPath<StudyMemberRole> role = createEnum("role", StudyMemberRole.class);

    public final com.ground.sswm.studyroom.domain.QStudyroom studyroom;

    public final NumberPath<Integer> totalRest = createNumber("totalRest", Integer.class);

    public final NumberPath<Integer> totalStudy = createNumber("totalStudy", Integer.class);

    public final com.ground.sswm.user.domain.QUser user;

    public QUserStudyroom(String variable) {
        this(UserStudyroom.class, forVariable(variable), INITS);
    }

    public QUserStudyroom(Path<? extends UserStudyroom> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserStudyroom(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserStudyroom(PathMetadata metadata, PathInits inits) {
        this(UserStudyroom.class, metadata, inits);
    }

    public QUserStudyroom(Class<? extends UserStudyroom> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.studyroom = inits.isInitialized("studyroom") ? new com.ground.sswm.studyroom.domain.QStudyroom(forProperty("studyroom")) : null;
        this.user = inits.isInitialized("user") ? new com.ground.sswm.user.domain.QUser(forProperty("user")) : null;
    }

}

