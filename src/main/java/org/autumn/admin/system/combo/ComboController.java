package org.autumn.admin.system.combo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.autumn.admin.Consts;
import org.autumn.admin.common.param.base.IParam;
import org.autumn.admin.common.param.base.IParamService;
import org.autumn.admin.common.param.enums.IEnumParam;
import org.autumn.admin.common.param.enums.IEnumParamItem;
import org.autumn.admin.common.param.region.IRegionParam;
import org.autumn.admin.common.param.region.IRegionParamItem;
import org.autumn.admin.common.param.single.ISingleParam;
import org.autumn.admin.common.param.tree.ITreeParam;
import org.autumn.admin.common.param.tree.ITreeParamNode;
import org.autumn.commons.tree.ITreeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Consts.V1 + "/combos")
public class ComboController {

    @Autowired
    private IParamService paramService;

    /**
     * 获取参数定义的下拉选项数据
     *
     * @param form
     *
     * @return
     */
    @GetMapping("{names}")
    public List<Map<String, Object>> getComboDatas(ComboForm form) {
        String names = form.getNames();
        Map<String, IParam> params = paramService.getParams(Arrays.asList(names.split("\\s*,\\s*")));
        List<Map<String, Object>> datas = new ArrayList<>();
        if (null != params) {
            for (IParam param : params.values()) {
                Map<String, Object> map = new HashMap<>();
                map.put("type", param.getParamType());
                map.put("name", param.getParamCode());
                map.put("data", convertParam2EasyUIView(param));
                datas.add(map);
            }
        }
        return datas;
    }

    /**
     * 转换为EasyUI视图数据
     *
     * @param param
     *
     * @return
     */
    private Object convertParam2EasyUIView(IParam param) {
        if (param instanceof ITreeParam) {
            List<ITreeNode> children = ((ITreeParam) param).getVirtualRoot().getChildren();
            List<Map<String, Object>> datas = new ArrayList<>();
            for (ITreeNode node : children) {
                datas.add(convertTreeParamNode2EasyUIView((ITreeParamNode) node));
            }
            return datas;
        } else if (param instanceof IRegionParam) {
            List<Map<String, Object>> datas = new ArrayList<>();
            for (IRegionParamItem item : ((IRegionParam) param).getItems()) {
                datas.add(convertRegionParamNode2EasyUIView(item));
            }
            return datas;
        } else if (param instanceof IEnumParam) {
            List<Map<String, Object>> datas = new ArrayList<>();
            for (IEnumParamItem item : ((IEnumParam) param).getItems()) {
                datas.add(convertEnumParamNode2EasyUIView(item));
            }
            return datas;
        } else if (param instanceof ISingleParam) {
            return convertSingleParamNode2EasyUIView((ISingleParam) param);
        } else {
            return param;
        }
    }

    private Map<String, Object> convertTreeParamNode2EasyUIView(ITreeParamNode node) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", node.getItemCode());
        data.put("text", node.getItemText());
        data.put("state", node.isLeaf() ? "open" : "closed");
        data.put("param", node.getItemParam());
        data.put("depth", node.getDepth());
        data.put("iconCls", node.getIcon());
        data.put("depth", node.getDepth());
        if (!node.isLeaf()) {
            List<Map<String, Object>> children = new ArrayList<>();
            data.put("children", children);
            for (ITreeNode child : node.getChildren()) {
                children.add(convertTreeParamNode2EasyUIView((ITreeParamNode) child));
            }
        }
        return data;
    }

    private Map<String, Object> convertRegionParamNode2EasyUIView(IRegionParamItem item) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", item.getItemCode());
        //data.put("text", item.getItemText());
        data.put("param", item.getItemParam());
        data.put("leftSign", item.getLeftSign());
        data.put("leftValue", item.getLeftValue());
        data.put("rightSign", item.getRightSign());
        data.put("rightSign", item.getRightValue());

        String leftSign = item.getLeftSign();
        String left = "";
        String leftValue = "";
        if ("closed".equalsIgnoreCase(leftSign)) {
            left = "[";
            leftValue = String.valueOf(item.getLeftValue());
        } else if ("open".equalsIgnoreCase(leftSign)) {
            left = "(";
            leftValue = String.valueOf(item.getLeftValue());
        } else {
            left = "(";
            leftValue = "-∞";
        }

        String rightSign = item.getRightSign();
        String right = "";
        String rightValue = "";
        if ("closed".equalsIgnoreCase(rightSign)) {
            right = "]";
            rightValue = String.valueOf(item.getRightValue());
        } else if ("open".equalsIgnoreCase(rightSign)) {
            right = ")";
            rightValue = String.valueOf(item.getRightValue());
        } else {
            right = ")";
            rightValue = "+∞";
        }

        String region = new StringBuilder().append(left).append(leftValue).append(",").append(rightValue).append(right).toString();
        data.put("text", region);
        return data;
    }

    private Map<String, Object> convertEnumParamNode2EasyUIView(IEnumParamItem item) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", item.getItemCode());
        data.put("text", item.getItemText());
        data.put("param", item.getItemParam());
        return data;
    }

    /**
     * 结构转换
     *
     * @param param
     *
     * @return
     */
    private Map<String, Object> convertSingleParamNode2EasyUIView(ISingleParam param) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", param.getParamCode());
        data.put("value", param.getValue());
        data.put("defaultValue", param.getDefaultValue());
        return data;
    }
}
