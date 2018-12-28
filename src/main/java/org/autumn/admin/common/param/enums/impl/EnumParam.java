package org.autumn.admin.common.param.enums.impl;

import java.util.List;

import org.autumn.admin.common.param.base.impl.Param;
import org.autumn.admin.common.param.enums.IEnumParam;
import org.autumn.admin.common.param.enums.IEnumParamItem;

public class EnumParam extends Param implements IEnumParam {

    /**
     *
     */
    private static final long serialVersionUID = 6623372358911195769L;

    private List<IEnumParamItem> items;

    @Override
    public List<IEnumParamItem> getItems() {
        return items;
    }

    public void setItems(List<IEnumParamItem> items) {
        this.items = items;
    }
}
