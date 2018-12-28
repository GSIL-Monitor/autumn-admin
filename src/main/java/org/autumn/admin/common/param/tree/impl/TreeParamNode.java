package org.autumn.admin.common.param.tree.impl;

import org.autumn.admin.common.param.tree.ITreeParamNode;
import org.autumn.commons.tree.impl.TreeNode;

public class TreeParamNode extends TreeNode implements ITreeParamNode {

    /**
     *
     */
    private static final long serialVersionUID = 7987243180794178726L;

    private String paramCode;

    @Override
    public String getParamCode() {
        return paramCode;
    }

    public void setParamCode(String paramCode) {
        this.paramCode = paramCode;
    }

    @Override
    public String getItemCode() {
        return super.getCode();
    }

    @Override
    public String getItemText() {
        return super.getText();
    }

    @Override
    public String getItemParam() {
        return super.getData();
    }
}
