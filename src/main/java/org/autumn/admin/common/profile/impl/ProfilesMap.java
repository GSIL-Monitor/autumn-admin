package org.autumn.admin.common.profile.impl;

import java.io.Serializable;
import java.util.Map;

public class ProfilesMap implements Serializable {

    private static final long serialVersionUID = -3851691513454648407L;

    private final Map<String, Profile> profiles;

    public ProfilesMap(Map<String, Profile> profiles) {
        this.profiles = profiles;
    }

    public Map<String, Profile> getProfiles() {
        return profiles;
    }
}
