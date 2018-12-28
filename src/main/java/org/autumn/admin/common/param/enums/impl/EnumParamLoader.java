package org.autumn.admin.common.param.enums.impl;

import java.util.Collection;

import org.autumn.admin.common.param.ParamType;
import org.autumn.admin.common.param.base.IParamLoader;
import org.autumn.admin.common.param.base.impl.db.AbstractDbParamLoader;
import org.autumn.admin.common.param.enums.IEnumParam;

public class EnumParamLoader extends AbstractDbParamLoader<IEnumParam> implements IParamLoader<IEnumParam> {

    @Override
    public Collection<IEnumParam> getParams(Collection<String> codes) {
        return repository.loadEnumParams(codes);
    }

    @Override
    protected ParamType getParamType() {
        return ParamType.LIST;
    }
}
