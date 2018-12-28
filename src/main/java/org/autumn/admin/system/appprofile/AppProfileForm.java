package org.autumn.admin.system.appprofile;

import java.util.List;

import org.autumn.admin.common.BaseForm;
import org.autumn.admin.common.profile.impl.Profile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppProfileForm extends BaseForm {

    /**
     *
     */
    private static final long serialVersionUID = -2895697381885168508L;

    private String paramGroup;

    private List<Profile> profiles;

}
