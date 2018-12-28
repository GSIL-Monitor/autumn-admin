package org.autumn.admin.common.param.region;

import org.autumn.admin.common.param.enums.IEnumParamItem;

public interface IRegionParamItem extends IEnumParamItem {

    String getLeftSign();

    double getLeftValue();

    String getRightSign();

    double getRightValue();
}
