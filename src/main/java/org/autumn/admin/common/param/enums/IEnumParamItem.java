package org.autumn.admin.common.param.enums;

import java.io.Serializable;

public interface IEnumParamItem extends Serializable {

    String getParamCode();

    String getItemCode();

    String getItemText();

    String getItemParam();

    int getSeqno();

    String getDes();
}
