package org.autumn.admin.system.appprofile;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppProfileBean implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = -2895697381885168508L;

    private String paramCode;

    private String paramName;

    private String paramGroup;

    private boolean editable;

    private String paramType;

    private String dataType;

    private String defaultValue;

    private String storeType;

    private String valueRule;

    private String valueRuleParam;

    private boolean allowEmpty;

    private int minLength;

    private int maxLength;

    private String paramValue;

    private String des;

    private int seqno;
}
