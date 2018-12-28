package org.autumn.admin.common.param.base;

import java.io.Serializable;

public interface IParam extends Serializable {

    String getParamCode();

    String getParamName();

    String getParamType();

    String getParamGroup();

    boolean isEditable();

    int getSeqno();

    String getDes();
}
