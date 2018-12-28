package org.autumn.admin.common.param.base.impl.db;

import java.util.Arrays;
import java.util.Collection;

import org.autumn.admin.common.param.ParamType;
import org.autumn.admin.common.param.base.IParam;
import org.autumn.admin.common.param.base.impl.AbstractParamLoader;

public abstract class AbstractDbParamLoader<P extends IParam> extends AbstractParamLoader<P> {

    protected ParamLoaderRepository repository;

    /**
     * 抽象方法，表示参数定义的类型
     *
     * @return
     */
    abstract protected ParamType getParamType();

    @Override
    protected Collection<String> loadCodes() {
        return repository.loadParamCodes(getParamType().name());
    }

    @Override
    public P getParam(String code) {
        Collection<P> params = this.getParams(Arrays.asList(code));
        if (null != params && !params.isEmpty()) {
            return params.iterator().next();
        }
        return null;
    }

    public void setRepository(ParamLoaderRepository repository) {
        this.repository = repository;
    }
}
