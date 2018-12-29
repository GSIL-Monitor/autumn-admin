package org.autumn.admin.common.profile;

import org.autumn.admin.common.profile.impl.ProfileRepository;
import org.autumn.admin.common.profile.impl.ProfileServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;

public class CommonProfileAutoConfiguration {

    @Autowired
    private ProfileRepository repository;

    @Bean
    @ConditionalOnMissingBean(ProfileService.class)
    public ProfileService profileServiceImpl() {
        ProfileServiceImpl profileServiceImpl = new ProfileServiceImpl();
        profileServiceImpl.setRepository(repository);
        return profileServiceImpl;
    }

    @Bean
    @ConditionalOnMissingBean(Profiles.class)
    public Profiles profiles(ProfileService profileService) {
        Profiles profiles = new Profiles();
        Profiles.setProfileService(profileService);
        return profiles;
    }
}
