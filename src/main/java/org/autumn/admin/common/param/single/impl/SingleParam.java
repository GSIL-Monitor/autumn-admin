package org.autumn.admin.common.param.single.impl;

import org.autumn.admin.common.param.base.impl.Param;
import org.autumn.admin.common.param.single.ISingleParam;

public class SingleParam extends Param implements ISingleParam {

    /**
     *
     */
    private static final long serialVersionUID = 5010670654177894284L;

    private String storeType;

    private String dataType;

    private String defaultValue;

    private String value;

    private String valueRule;

    private String valueRuleParam;

    private boolean allowEmpty;

    private int minLength;

    private int maxLength;

    @Override
    public String getStoreType() {
        return storeType;
    }

    public void setStoreType(String storeType) {
        this.storeType = storeType;
    }

    @Override
    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    @Override
    public String getDefaultValue() {
        return defaultValue;
    }

    public void setDefaultValue(String defaultValue) {
        this.defaultValue = defaultValue;
    }

    @Override
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String getValueRule() {
        return valueRule;
    }

    public void setValueRule(String valueRule) {
        this.valueRule = valueRule;
    }

    @Override
    public String getValueRuleParam() {
        return valueRuleParam;
    }

    public void setValueRuleParam(String valueRuleParam) {
        this.valueRuleParam = valueRuleParam;
    }

    @Override
    public boolean isAllowEmpty() {
        return allowEmpty;
    }

    public void setAllowEmpty(boolean allowEmpty) {
        this.allowEmpty = allowEmpty;
    }

    @Override
    public int getMinLength() {
        return minLength;
    }

    public void setMinLength(int minLength) {
        this.minLength = minLength;
    }

    @Override
    public int getMaxLength() {
        return maxLength;
    }

    public void setMaxLength(int maxLength) {
        this.maxLength = maxLength;
    }
}
