package org.autumn.admin.common.profile;

public class Profiles {

    private static ProfileService profileService;

    public static void setProfileService(ProfileService profileService) {
        Profiles.profileService = profileService;
    }

    public static <V> V getUserProfile(String userId, String code, Class<V> cls) {
        return profileService.getUserProfile(userId, code, cls);
    }

    public static <V> V getUserProfile(String userId, String code, Class<V> cls, V defaultValue) {
        V v = profileService.getUserProfile(userId, code, cls);
        if (null == v) {
            return defaultValue;
        }
        return v;
    }

    public static void removeUserProfile(String userId, String code) {
        profileService.removeUserProfile(userId, code);
    }

    public static void clearUserProfile(String userId) {
        profileService.clearUserProfile(userId);
    }

    public static <V> V getAppProfile(String code, Class<V> cls) {
        return profileService.getAppProfile(code, cls);
    }

    public static <V> V getAppProfile(String code, Class<V> cls, V defaultValue) {
        V v = profileService.getAppProfile(code, cls);
        if (null == v) {
            return defaultValue;
        }
        return v;
    }

    public static void removeAppProfile(String code) {
        profileService.removeAppProfile(code);
    }

    public static void clearAppProfile() {
        profileService.clearAppProfile();
    }
}
