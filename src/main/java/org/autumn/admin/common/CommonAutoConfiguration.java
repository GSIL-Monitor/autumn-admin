package org.autumn.admin.common;

import org.autumn.admin.common.param.CommonParamAutoConfiguration;
import org.autumn.admin.common.profile.CommonProfileAutoConfiguration;
import org.springframework.context.annotation.Import;

@Import({
        CommonParamAutoConfiguration.class,
        CommonProfileAutoConfiguration.class
})
public class CommonAutoConfiguration {

}
