package com.ground.sswm.usertree.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserTree is a Querydsl query type for UserTree
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserTree extends EntityPathBase<UserTree> {

    private static final long serialVersionUID = -411266580L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserTree userTree = new QUserTree("userTree");

    public final NumberPath<Integer> exp = createNumber("exp", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.ground.sswm.tree.domain.QTree tree;

    public final com.ground.sswm.user.domain.QUser user;

    public QUserTree(String variable) {
        this(UserTree.class, forVariable(variable), INITS);
    }

    public QUserTree(Path<? extends UserTree> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserTree(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserTree(PathMetadata metadata, PathInits inits) {
        this(UserTree.class, metadata, inits);
    }

    public QUserTree(Class<? extends UserTree> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.tree = inits.isInitialized("tree") ? new com.ground.sswm.tree.domain.QTree(forProperty("tree")) : null;
        this.user = inits.isInitialized("user") ? new com.ground.sswm.user.domain.QUser(forProperty("user")) : null;
    }

}

