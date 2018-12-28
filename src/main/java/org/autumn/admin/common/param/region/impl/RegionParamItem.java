package org.autumn.admin.common.param.region.impl;

import org.autumn.admin.common.param.enums.impl.EnumParamItem;
import org.autumn.admin.common.param.region.IRegionParamItem;

public class RegionParamItem extends EnumParamItem implements IRegionParamItem {

    /**
     *
     */
    private static final long serialVersionUID = 130893374603806286L;

    private String leftSign;

    private double leftValue;

    private String rightSign;

    private double rightValue;

    @Override
    public String getLeftSign() {
        return leftSign;
    }

    public void setLeftSign(String leftSign) {
        this.leftSign = leftSign;
    }

    @Override
    public double getLeftValue() {
        return leftValue;
    }

    public void setLeftValue(double leftValue) {
        this.leftValue = leftValue;
    }

    @Override
    public String getRightSign() {
        return rightSign;
    }

    public void setRightSign(String rightSign) {
        this.rightSign = rightSign;
    }

    @Override
    public double getRightValue() {
        return rightValue;
    }

    public void setRightValue(double rightValue) {
        this.rightValue = rightValue;
    }
}
