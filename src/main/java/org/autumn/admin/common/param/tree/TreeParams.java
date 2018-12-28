package org.autumn.admin.common.param.tree;

import java.util.Set;

import org.autumn.admin.common.param.base.IParamService;

public class TreeParams {

    private IParamService paramService;

    public void setParamService(IParamService paramService) {
        this.paramService = paramService;
    }

    public String codes(String paramCode) {
        return this.codes(paramCode, null, false);
    }

    public String codes(String paramCode, String itemCode) {
        return this.codes(paramCode, itemCode, false);
    }

    public String codes(String paramCode, boolean isNumberic) {
        return this.codes(paramCode, null, isNumberic);
    }

    public String codes(String paramCode, String itemCode, boolean isNumberic) {
        ITreeParam param = paramService.getParam(paramCode, ITreeParam.class);
        if (null == param) {
            throw new IllegalArgumentException("没有找到代码为" + paramCode + "的树型参数，请检查参数是否正确...");
        }
        ITreeParamNode node = null;
        Set<String> codes = null;
        if (null == itemCode) {
            node = param.getVirtualRoot();
            codes = node.getAllChildrenCodes(false);
        } else {
            node = param.getNode(itemCode);
            codes = node.getAllChildrenCodes(true);
        }
        StringBuilder sb = new StringBuilder();
        if (isNumberic) {
            for (String code : codes) {
                sb.append(",").append(code);
            }
        } else {
            for (String code : codes) {
                sb.append(",'").append(code).append("'");
            }
        }
        return "(" + sb.substring(1) + ")";
    }
}
