package org.autumn.admin.system.appprofile;

import java.util.Arrays;
import java.util.List;

import org.autumn.admin.Consts;
import org.autumn.admin.common.param.base.IParamService;
import org.autumn.admin.common.param.tree.ITreeParamNode;
import org.autumn.admin.common.param.tree.impl.TreeParam;
import org.autumn.admin.common.param.tree.impl.TreeParamNode;
import org.autumn.commons.web.annotation.JsonBody;
import org.autumn.commons.web.annotation.JsonClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Consts.V1 + "/system/profiles")
public class AppProfileController {

    @Autowired
    private IParamService paramService;

    @Autowired
    private AppProfileService service;

    /**
     * 加载应用配置的分类（树型结构）
     *
     * @return
     */
    @GetMapping("/tree")
    @JsonBody(classes = @JsonClass(cls = TreeParamNode.class, fields = {"children", "code#id", "text", "leaf"}))
    public List<ITreeParamNode> loadProfileTree() {
        TreeParam tree = paramService.getParam(Consts.PARAM_GROUP_NODES, TreeParam.class);
        ITreeParamNode node = tree.getNode(Consts.PARAM_PROFILE_APP);
        List<ITreeParamNode> list = Arrays.asList(node);
        return list;
    }

    /**
     * 查询个性化设置列表
     *
     * @param form
     *
     * @return
     */
    @GetMapping("")
    public List<AppProfileBean> list(AppProfileForm form) {
        return service.list(form);
    }

    /**
     * 更新个性化设置
     *
     * @param form
     */
    @PutMapping("")
    public void update(AppProfileForm form) {
        service.update(form);
    }
}
