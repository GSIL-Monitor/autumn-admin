package org.autumn.admin.common;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseForm implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 5252850174203666438L;

    /**
     * 当前用户ID
     */
    private String optUserId;

    /**
     * 当前会话ID
     */
    private String sessionId;
}
