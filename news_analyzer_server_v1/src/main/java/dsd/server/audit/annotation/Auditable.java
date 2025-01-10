package dsd.server.audit.annotation;

import dsd.server.common.type.ActionType;
import dsd.server.common.type.EntityType;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Auditable {
    EntityType entity();
    ActionType action();
}
