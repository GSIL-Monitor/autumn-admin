package org.autumn.admin.system.appprofile;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.autumn.mybatis.annotation.Execute;
import org.autumn.mybatis.annotation.Executes;
import org.autumn.mybatis.annotation.SqlRef;

@Mapper
public interface AppProfileRepository {

    /**
     * 查询列表
     *
     * @param form
     *
     * @return
     */
    @SqlRef("select")
    List<AppProfileBean> findAll(AppProfileForm form);

    /**
     * 更新，先删除，后插入
     *
     * @param form
     *
     * @return
     */
    @Executes({
            @Execute(sqlRef = "delete", property = "profiles"),
            @Execute(sqlRef = "insert", property = "profiles")
    })
    int[] update(AppProfileForm form);
}
