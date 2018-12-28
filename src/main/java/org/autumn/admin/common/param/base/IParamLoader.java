package org.autumn.admin.common.param.base;

import java.util.Collection;

public interface IParamLoader<P extends IParam> {

    P getParam(String code);

    Collection<P> getParams(Collection<String> codes);

    Collection<String> getCodes();

    void clearCodes();
}
