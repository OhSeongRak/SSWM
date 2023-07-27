package com.ground.sswm.dailyLog.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDailyLog is a Querydsl query type for DailyLog
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDailyLog extends EntityPathBase<DailyLog> {

    private static final long serialVersionUID = 2025237200L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDailyLog dailyLog = new QDailyLog("dailyLog");

    public final NumberPath<Integer> date = createNumber("date", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> restTime = createNumber("restTime", Integer.class);

    public final NumberPath<Integer> stretchScore = createNumber("stretchScore", Integer.class);

    public final com.ground.sswm.studyroom.domain.QStudyroom studyroom;

    public final NumberPath<Integer> studyTime = createNumber("studyTime", Integer.class);

    public final com.ground.sswm.user.domain.QUser user;

    public QDailyLog(String variable) {
        this(DailyLog.class, forVariable(variable), INITS);
    }

    public QDailyLog(Path<? extends DailyLog> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDailyLog(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDailyLog(PathMetadata metadata, PathInits inits) {
        this(DailyLog.class, metadata, inits);
    }

    public QDailyLog(Class<? extends DailyLog> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.studyroom = inits.isInitialized("studyroom") ? new com.ground.sswm.studyroom.domain.QStudyroom(forProperty("studyroom")) : null;
        this.user = inits.isInitialized("user") ? new com.ground.sswm.user.domain.QUser(forProperty("user")) : null;
    }

}

