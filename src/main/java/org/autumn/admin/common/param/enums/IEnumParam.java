package org.autumn.admin.common.param.enums;

import java.util.List;

import org.autumn.admin.common.param.base.IParam;

public interface IEnumParam extends IParam {

    List<IEnumParamItem> getItems();
}
