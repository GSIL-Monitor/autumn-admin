package org.autumn.admin.common.param.tree.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.autumn.admin.common.param.ParamType;
import org.autumn.admin.common.param.base.IParamLoader;
import org.autumn.admin.common.param.base.impl.db.AbstractDbParamLoader;
import org.autumn.admin.common.param.tree.ITreeParam;
import org.autumn.admin.common.param.tree.ITreeParamNode;

public class TreeParamLoader extends AbstractDbParamLoader<ITreeParam> implements IParamLoader<ITreeParam> {

    @Override
    public Collection<ITreeParam> getParams(Collection<String> codes) {
        Collection<ITreeParam> params = repository.loadTreeParams(codes);
        if (null == params || params.isEmpty()) {
            return null;
        }

        List<ITreeParamNode> nodes = repository.loadTreeParamNodes(codes);
        if (null != nodes && !nodes.isEmpty()) {
            for (ITreeParam param : params) {
                String code = param.getParamCode();
                List<ITreeParamNode> paramNodes = new ArrayList<>();
                for (ITreeParamNode node : nodes) {
                    if (code.equals(node.getParamCode())) {
                        paramNodes.add(node);
                    }
                }
                if (!paramNodes.isEmpty()) {
                    param.build(paramNodes);
                }
            }
        }
        return params;
    }

    @Override
    protected ParamType getParamType() {
        return ParamType.TREE;
    }
}
