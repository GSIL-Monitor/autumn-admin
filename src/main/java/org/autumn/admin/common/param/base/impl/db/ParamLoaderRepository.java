package org.autumn.admin.common.param.base.impl.db;

import java.util.Collection;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.autumn.admin.common.param.enums.IEnumParam;
import org.autumn.admin.common.param.region.IRegionParam;
import org.autumn.admin.common.param.single.ISingleParam;
import org.autumn.admin.common.param.tree.ITreeParam;
import org.autumn.admin.common.param.tree.ITreeParamNode;

@Mapper
public interface ParamLoaderRepository {

    Collection<String> loadParamCodes(String paramType);

    Collection<ISingleParam> loadSingleParams(@Param("codes") Collection<String> codes);

    Collection<IEnumParam> loadEnumParams(@Param("codes") Collection<String> codes);

    Collection<IRegionParam> loadRegionParams(@Param("codes") Collection<String> codes);

    Collection<ITreeParam> loadTreeParams(@Param("codes") Collection<String> codes);

    List<ITreeParamNode> loadTreeParamNodes(@Param("codes") Collection<String> codes);
}
