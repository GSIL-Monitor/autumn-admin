package org.autumn.admin.common.param.single.impl;

import java.util.Collection;

import org.autumn.admin.common.param.ParamType;
import org.autumn.admin.common.param.base.IParamLoader;
import org.autumn.admin.common.param.base.impl.db.AbstractDbParamLoader;
import org.autumn.admin.common.param.single.ISingleParam;

public class SingleParamLoader extends AbstractDbParamLoader<ISingleParam> implements IParamLoader<ISingleParam> {

    @Override
    public Collection<ISingleParam> getParams(Collection<String> codes) {
        return repository.loadSingleParams(codes);
    }

    @Override
    protected ParamType getParamType() {
        return ParamType.SINGLE;
    }
}
