package org.autumn.admin.common.profile.impl;

import java.util.Map;

import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProfileRepository {

    /**
     * 加载用户的个性化设置
     *
     * @param userId
     *
     * @return
     */
    @MapKey("code")
    Map<String, Profile> loadUserProfiles(String userId);

    /**
     * 加载应用的个性化设置
     *
     * @return
     */
    @MapKey("code")
    Map<String, Profile> loadAppProfiles();
}
