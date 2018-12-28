package org.autumn.admin.common.param.region;

import java.util.List;

import org.autumn.admin.common.param.base.IParam;

public interface IRegionParam extends IParam {

    List<IRegionParamItem> getItems();

}
