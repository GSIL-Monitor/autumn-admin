package org.autumn.admin.common.param.base.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.autumn.admin.common.param.base.IParam;
import org.autumn.admin.common.param.base.IParamLoader;
import org.autumn.admin.common.param.base.IParamService;
import org.autumn.commons.spring.SpringHolder;
import org.springframework.cache.Cache;

public class ParamService implements IParamService {

    private List<IParamLoader<? extends IParam>> loaders;

    public void setLoaders(List<IParamLoader<? extends IParam>> loaders) {
        this.loaders = loaders;
    }

    protected Cache getCache() {
        return SpringHolder.getCache("paramService:" + this.getClass().getSimpleName());
    }

    @Override
    public <P extends IParam> P getParam(String code, Class<P> cls) {
        IParam param = getCachedParam(code);
        if (null != param) {
            return cls.cast(param);
        }
        synchronized (this) {
            param = getCachedParam(code);
            if (null != param) {
                return cls.cast(param);
            }
            IParamLoader<? extends IParam> loader = this.getParamLoader(code);
            if (null != loader) {
                param = loader.getParam(code);
                cacheParam(code, param);
                return cls.cast(param);
            }
        }
        return null;
    }

    @Override
    public Map<String, IParam> getParams(Collection<String> codes) {
        Map<String, IParam> rs = new HashMap<>();
        List<String> retains = new ArrayList<>();
        for (String code : codes) {
            IParam param = this.getCachedParam(code);
            if (null != param) {
                // 已经有缓存数据，直接放入返回结果
                rs.put(code, param);
            } else {
                // 没有缓存数据，放入待查询的列表
                retains.add(code);
            }
        }

        if (!retains.isEmpty()) {
            synchronized (this) {
                List<String> gets = new ArrayList<>();
                for (String code : retains) {//在同步块中再次从缓存获取
                    IParam param = this.getCachedParam(code);
                    if (null != param) {
                        rs.put(code, param);
                    } else {
                        gets.add(code);
                    }
                }

                if (!gets.isEmpty()) {
                    Map<IParamLoader<? extends IParam>, Collection<String>> loaderCodeMap = new HashMap<>();
                    for (String code : gets) {//需要查询的列表，将所有code按加载器分类
                        IParamLoader<?> loader = this.getParamLoader(code);
                        if (null == loader) {
                            continue;
                        }

                        Collection<String> lcodes = loaderCodeMap.get(loader);
                        if (null == lcodes) {
                            lcodes = new ArrayList<>();
                            loaderCodeMap.put(loader, lcodes);
                        }
                        lcodes.add(code);
                    }

                    // 按加载器加载
                    for (Map.Entry<IParamLoader<? extends IParam>, Collection<String>> entry : loaderCodeMap.entrySet()) {
                        Collection<? extends IParam> params = entry.getKey().getParams(entry.getValue());
                        if (null != params && !params.isEmpty()) {
                            for (IParam param : params) {
                                String code = param.getParamCode();
                                rs.put(code, param);
                                cacheParam(code, param);
                            }
                        }
                    }
                }
            }
        }
        return rs;
    }

    @Override
    public void removeParam(String code) {
        Cache cache = validate();
        cache.evict(code);
        clearParamLoaderCache();
    }

    @Override
    public void removeParams(Collection<String> codes) {
        Cache cache = validate();
        for (String code : codes) {
            cache.evict(code);
        }
        clearParamLoaderCache();
    }

    @Override
    public void clear() {
        Cache cache = validate();
        cache.clear();
        clearParamLoaderCache();
    }

    private void clearParamLoaderCache() {
        if (null != loaders) {
            for (IParamLoader<? extends IParam> loader : loaders) {
                loader.clearCodes();
            }
        }
    }

    private IParamLoader<? extends IParam> getParamLoader(String code) {
        if (null != loaders) {
            for (IParamLoader<? extends IParam> loader : loaders) {
                Collection<String> codes = loader.getCodes();
                if (null != codes && codes.contains(code)) {
                    return loader;
                }
            }
        }
        return null;
    }

    private void cacheParam(String code, IParam param) {
        Cache cache = validate();
        cache.put(code, param);
    }

    private IParam getCachedParam(String code) {
        Cache cache = validate();
        return cache.get(code, IParam.class);
    }

    private Cache validate() {
        Cache cache = this.getCache();
        if (null == cache) {
            throw new IllegalStateException("the param cache container is null.");
        }
        return cache;
    }
}
