package org.autumn.admin.common.param.base;

import java.util.Collection;
import java.util.Map;

public interface IParamService {

    <P extends IParam> P getParam(String code, Class<P> cls);

    Map<String, IParam> getParams(Collection<String> codes);

    void removeParam(String code);

    void removeParams(Collection<String> codes);

    void clear();
}
