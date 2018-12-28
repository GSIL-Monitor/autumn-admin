package org.autumn.admin.common.param.region.impl;

import java.util.Collection;

import org.autumn.admin.common.param.ParamType;
import org.autumn.admin.common.param.base.IParamLoader;
import org.autumn.admin.common.param.base.impl.db.AbstractDbParamLoader;
import org.autumn.admin.common.param.region.IRegionParam;

public class RegionParamLoader extends AbstractDbParamLoader<IRegionParam> implements IParamLoader<IRegionParam> {

    @Override
    public Collection<IRegionParam> getParams(Collection<String> codes) {
        return repository.loadRegionParams(codes);
    }

    @Override
    protected ParamType getParamType() {
        return ParamType.REGION;
    }
}
