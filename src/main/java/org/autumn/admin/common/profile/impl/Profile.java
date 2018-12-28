package org.autumn.admin.common.profile.impl;

import java.io.Serializable;

import org.autumn.commons.spring.SpringHolder;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Profile implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = -3884958903833171191L;

    private String code;

    private String value;

    public <V> V get(Class<V> cls) {
        if (null != value) {
            if ("".equals(value.trim()) && !String.class.isAssignableFrom(cls)) {
                return null;
            } else {
                return SpringHolder.convert(value, cls);
            }
        }
        return null;
    }
}
