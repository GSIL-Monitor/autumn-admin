package org.autumn.admin.common.param.base.impl;

import java.util.Collection;

import org.autumn.admin.common.param.base.IParam;
import org.autumn.admin.common.param.base.IParamLoader;
import org.autumn.commons.spring.SpringHolder;
import org.springframework.cache.Cache;

public abstract class AbstractParamLoader<P extends IParam> implements IParamLoader<P> {

    private static final String cacheKey = "ParamLoaderCodesCacheKey";

    abstract protected Collection<String> loadCodes();

    @Override
    public Collection<String> getCodes() {
        Collection<String> codes = getCachedParam();
        if (null == codes) {
            codes = this.loadCodes();
            cacheParam(codes);
        }
        return codes;
    }

    @Override
    public void clearCodes() {
        Cache cache = validate();
        cache.clear();
    }

    private void cacheParam(Collection<String> codes) {
        Cache cache = validate();
        cache.put(cacheKey, codes);
    }

    private Collection<String> getCachedParam() {
        Cache cache = validate();
        return cache.get(cacheKey, Collection.class);
    }

    private Cache validate() {
        Cache cache = this.getCodesCache();
        if (null == cache) {
            throw new IllegalStateException("the param loader cache container is null.");
        }
        return cache;
    }

    private Cache getCodesCache() {
        return SpringHolder.getCache("paramLoader:" + this.getClass().getSimpleName());
    }
}
