package org.autumn.admin.common.param.single;

import org.autumn.admin.common.param.base.IParam;

public interface ISingleParam extends IParam {

    /**
     * 获取存储方式
     *
     * @return 存储方式
     */
    String getStoreType();

    /**
     * 获取数据类型
     *
     * @return 数据类型
     */
    String getDataType();

    /**
     * 获取默认值
     *
     * @return 默认值
     */
    String getDefaultValue();

    /**
     * 获取值
     *
     * @return
     */
    String getValue();

    /**
     * 获取取值规则，如数据字典，数据范围等
     *
     * @return 取值规则
     */
    String getValueRule();

    /**
     * 获取取值规则的参数，如数据字典类型
     *
     * @return 取值规则的参数
     */
    String getValueRuleParam();

    /**
     * 是否允许为空
     *
     * @return
     */
    boolean isAllowEmpty();

    /**
     * 最小长度
     *
     * @return
     */
    int getMinLength();

    /**
     * 最大长度
     *
     * @return
     */
    int getMaxLength();
}
