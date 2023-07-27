package com.ground.sswm.tree.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTree is a Querydsl query type for Tree
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTree extends EntityPathBase<Tree> {

    private static final long serialVersionUID = -642866634L;

    public static final QTree tree = new QTree("tree");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final StringPath name = createString("name");

    public QTree(String variable) {
        super(Tree.class, forVariable(variable));
    }

    public QTree(Path<? extends Tree> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTree(PathMetadata metadata) {
        super(Tree.class, metadata);
    }

}

