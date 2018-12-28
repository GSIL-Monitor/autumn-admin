package org.autumn.admin.system.appprofile;

import java.util.List;

import org.autumn.admin.common.profile.Profiles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppProfileService {

    @Autowired
    private AppProfileRepository repository;

    /**
     * 查询列表
     *
     * @param form
     *
     * @return
     */
    public List<AppProfileBean> list(AppProfileForm form) {
        return repository.findAll(form);
    }

    /**
     * 更新，同时更新缓存
     *
     * @param form
     */
    public void update(AppProfileForm form) {
        repository.update(form);
        Profiles.clearAppProfile();
    }
}
