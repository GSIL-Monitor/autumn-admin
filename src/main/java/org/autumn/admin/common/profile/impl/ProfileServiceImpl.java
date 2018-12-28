package org.autumn.admin.common.profile.impl;

import org.autumn.admin.common.profile.ProfileService;
import org.autumn.commons.spring.SpringHolder;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.cache.Cache;
import org.springframework.stereotype.Component;

@Component
public class ProfileServiceImpl implements ProfileService, InitializingBean {

    private ProfileRepository repository;

    private Cache userProfiles;

    private Cache appProfiles;

    public void setRepository(ProfileRepository repository) {
        this.repository = repository;
    }

    /**
     * 初始化缓存容器
     */
    @Override
    public void afterPropertiesSet() throws Exception {
        this.userProfiles = SpringHolder.getCache("profiles:user");
        this.appProfiles = SpringHolder.getCache("profiles:app");
    }

    @Override
    public <V> V getUserProfile(String userId, String code, Class<V> cls) {
        return this.getProfile(userProfiles, userId, code, cls, false);
    }

    @Override
    public void removeUserProfile(String userId, String code) {
        this.removeProfile(userProfiles, userId, code);
    }

    @Override
    public void clearUserProfile(String userId) {
        userProfiles.evict(userId);
    }

    @Override
    public <V> V getAppProfile(String code, Class<V> cls) {
        return this.getProfile(appProfiles, "appId", code, cls, true);
    }

    @Override
    public void removeAppProfile(String code) {
        this.removeProfile(appProfiles, "appId", code);
    }

    @Override
    public void clearAppProfile() {
        appProfiles.clear();
    }

    private void removeProfile(Cache cache, String cacheKey, String profileKey) {
        ProfilesMap profiles = cache.get(cacheKey, ProfilesMap.class);
        if (null != profiles && null != profiles.getProfiles()) {
            profiles.getProfiles().remove(profileKey);
        }
    }

    private <V> V getProfile(Cache cache, String cacheKey, String profileKey, Class<V> cls, boolean isAppProfile) {
        ProfilesMap profiles = getProfilesMap(cache, cacheKey, isAppProfile);
        Profile profile = null;
        if (null != profiles && null != profiles.getProfiles()) {
            profile = profiles.getProfiles().get(profileKey);
        }
        if (null != profile) {
            return profile.get(cls);
        }
        return null;
    }

    /**
     * @param cache
     * @param cacheKey
     * @param isAppProfile
     *
     * @return
     */
    private ProfilesMap getProfilesMap(Cache cache, String cacheKey, boolean isAppProfile) {
        ProfilesMap profiles = cache.get(cacheKey, ProfilesMap.class);
        if (null == profiles) {
            synchronized (repository) {
                profiles = cache.get(cacheKey, ProfilesMap.class);
                if (null == profiles) {
                    if (isAppProfile) {
                        profiles = new ProfilesMap(repository.loadAppProfiles());
                    } else {
                        profiles = new ProfilesMap(repository.loadUserProfiles(cacheKey));
                    }
                    cache.put(cacheKey, profiles);
                }
            }
        }
        return profiles;
    }
}
