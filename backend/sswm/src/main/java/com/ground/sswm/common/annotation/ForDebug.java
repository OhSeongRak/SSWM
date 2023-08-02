package com.ground.sswm.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Target;
@Target(ElementType.METHOD)
public @interface ForDebug {
    // debug 용 함수임을 명시하기 위한 커스텀 어노테이션
}
