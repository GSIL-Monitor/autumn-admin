package org.autumn.admin.common;

import javax.sql.DataSource;

import org.autumn.admin.common.db.DbSchemaResourceDetector;
import org.autumn.admin.common.param.CommonParamAutoConfiguration;
import org.autumn.admin.common.profile.CommonProfileAutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;

@Import({
        CommonParamAutoConfiguration.class,
        CommonProfileAutoConfiguration.class
})
@AutoConfigureAfter(DataSourceAutoConfiguration.class)
public class CommonAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean(DbSchemaResourceDetector.class)
    public DbSchemaResourceDetector dbSchemaResourceDetector(DataSource dataSource) {
        return new DbSchemaResourceDetector(dataSource);
    }
}
