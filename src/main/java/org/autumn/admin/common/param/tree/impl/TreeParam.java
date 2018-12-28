package org.autumn.admin.common.param.tree.impl;

import java.util.List;

import org.autumn.admin.common.param.base.IParam;
import org.autumn.admin.common.param.enums.IEnumParamItem;
import org.autumn.admin.common.param.tree.ITreeParam;
import org.autumn.admin.common.param.tree.ITreeParamNode;
import org.autumn.commons.tree.impl.Tree;

public class TreeParam extends Tree<ITreeParamNode> implements ITreeParam {

    /**
     *
     */
    private static final long serialVersionUID = 4906428771603357750L;

    private IParam param;

    public IParam getParam() {
        return param;
    }

    public void setParam(IParam param) {
        this.param = param;
    }

    @Override
    public List<IEnumParamItem> getItems() {
        List<?> nodes = super.getNodes();
        return (List<IEnumParamItem>) nodes;
    }

    @Override
    public String getParamCode() {
        return param.getParamCode();
    }

    @Override
    public String getParamName() {
        return param.getParamName();
    }

    @Override
    public String getParamType() {
        return param.getParamType();
    }

    @Override
    public String getParamGroup() {
        return param.getParamGroup();
    }

    @Override
    public boolean isEditable() {
        return param.isEditable();
    }

    @Override
    public int getSeqno() {
        return param.getSeqno();
    }

    @Override
    public String getDes() {
        return param.getDes();
    }
}
