package org.autumn.admin.common.param.region.impl;

import java.util.List;

import org.autumn.admin.common.param.base.impl.Param;
import org.autumn.admin.common.param.region.IRegionParam;
import org.autumn.admin.common.param.region.IRegionParamItem;

public class RegionParam extends Param implements IRegionParam {

    /**
     *
     */
    private static final long serialVersionUID = 7621496797436669546L;

    private List<IRegionParamItem> items;

    @Override
    public List<IRegionParamItem> getItems() {
        return items;
    }

    public void setItems(List<IRegionParamItem> items) {
        this.items = items;
    }
}
