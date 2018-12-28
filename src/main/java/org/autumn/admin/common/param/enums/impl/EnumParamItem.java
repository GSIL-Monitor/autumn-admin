package org.autumn.admin.common.param.enums.impl;

import org.autumn.admin.common.param.enums.IEnumParamItem;

public class EnumParamItem implements IEnumParamItem {

    /**
     *
     */
    private static final long serialVersionUID = 7478049551210381606L;

    private String paramCode;

    private String itemCode;

    private String itemText;

    private String itemParam;

    private int seqno;

    private String des;

    @Override
    public String getParamCode() {
        return paramCode;
    }

    public void setParamCode(String paramCode) {
        this.paramCode = paramCode;
    }

    @Override
    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    @Override
    public String getItemText() {
        return itemText;
    }

    public void setItemText(String itemText) {
        this.itemText = itemText;
    }

    @Override
    public String getItemParam() {
        return itemParam;
    }

    public void setItemParam(String itemParam) {
        this.itemParam = itemParam;
    }

    @Override
    public int getSeqno() {
        return seqno;
    }

    public void setSeqno(int seqno) {
        this.seqno = seqno;
    }

    @Override
    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }
}
