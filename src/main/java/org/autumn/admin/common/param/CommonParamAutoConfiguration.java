package org.autumn.admin.common.param;

import java.util.List;

import org.autumn.admin.common.param.base.IParam;
import org.autumn.admin.common.param.base.IParamLoader;
import org.autumn.admin.common.param.base.IParamService;
import org.autumn.admin.common.param.base.impl.ParamService;
import org.autumn.admin.common.param.base.impl.db.AbstractDbParamLoader;
import org.autumn.admin.common.param.base.impl.db.ParamLoaderRepository;
import org.autumn.admin.common.param.enums.impl.EnumParamLoader;
import org.autumn.admin.common.param.region.impl.RegionParamLoader;
import org.autumn.admin.common.param.single.impl.SingleParamLoader;
import org.autumn.admin.common.param.tree.TreeParams;
import org.autumn.admin.common.param.tree.impl.TreeParamLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;

public class CommonParamAutoConfiguration {

    @Autowired
    private ParamLoaderRepository repository;

    @Bean
    @ConditionalOnMissingBean(ParamService.class)
    public IParamService paramService(List<IParamLoader<? extends IParam>> loaders) {
        ParamService paramService = new ParamService();
        paramService.setLoaders(loaders);
        return paramService;
    }

    @Bean("TreeParams")
    @ConditionalOnMissingBean(TreeParams.class)
    public TreeParams treeParams(IParamService paramService) {
        TreeParams treeParams = new TreeParams();
        treeParams.setParamService(paramService);
        return treeParams;
    }

    @Bean
    @ConditionalOnMissingBean(SingleParamLoader.class)
    public SingleParamLoader singleParamLoader() {
        return newParamLoader(SingleParamLoader.class);
    }

    @Bean
    @ConditionalOnMissingBean(EnumParamLoader.class)
    public EnumParamLoader enumParamLoader() {
        return newParamLoader(EnumParamLoader.class);
    }

    @Bean
    @ConditionalOnMissingBean(RegionParamLoader.class)
    public RegionParamLoader regionParamLoader() {
        return newParamLoader(RegionParamLoader.class);
    }

    @Bean
    @ConditionalOnMissingBean(TreeParamLoader.class)
    public TreeParamLoader treeParamLoader() {
        return newParamLoader(TreeParamLoader.class);
    }

    private <L extends AbstractDbParamLoader> L newParamLoader(Class<L> cls) {
        try {
            L l = cls.newInstance();
            l.setRepository(repository);
            return l;
        } catch (Exception e) {
            throw new IllegalStateException("create instance of " + cls + " has failred", e);
        }
    }
}
