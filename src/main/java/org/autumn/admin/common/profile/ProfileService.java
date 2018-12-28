package org.autumn.admin.common.profile;

public interface ProfileService {

    /**
     * 获取用户个性设置
     *
     * @param userId
     * @param code
     * @param cls
     *
     * @return
     */
    <V> V getUserProfile(String userId, String code, Class<V> cls);

    /**
     * 移除用户个性设置
     *
     * @param userId
     * @param code
     */
    void removeUserProfile(String userId, String code);

    /**
     * 清空用户个性设置
     *
     * @param userId
     */
    void clearUserProfile(String userId);

    /**
     * 获取应用个性设置
     *
     * @param code
     * @param cls
     *
     * @return
     */
    <V> V getAppProfile(String code, Class<V> cls);

    /**
     * 移除应用个性设置
     *
     * @param code
     */
    void removeAppProfile(String code);

    /**
     * 清空应用个性设置
     */
    void clearAppProfile();
}
