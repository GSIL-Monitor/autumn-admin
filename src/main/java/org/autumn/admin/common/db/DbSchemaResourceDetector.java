package org.autumn.admin.common.db;

import java.sql.Connection;
import javax.sql.DataSource;

import org.autumn.commons.Logs;
import org.autumn.commons.Utils;
import org.autumn.commons.spring.SpringHolder;
import org.autumn.mybatis.dialect.Dialects;
import org.autumn.mybatis.dialect.IDialect;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.support.JdbcUtils;

public class DbSchemaResourceDetector implements InitializingBean {

    private final DataSource dataSource;

    public DbSchemaResourceDetector(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        executeSchemaResource("create", "core", "pf_user");
    }

    private void executeSchemaResource(String operation, String module, String testTablename) {
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            if (Utils.isBlank(testTablename) || !org.autumn.commons.jdbc.JdbcUtils.exists(connection, testTablename)) {
                executeSchemaResource(connection, operation, module);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            JdbcUtils.closeConnection(connection);
        }
    }

    private void executeSchemaResource(Connection connection, String operation, String module) throws Exception {
        IDialect dialect = Dialects.getDialect(connection);
        String location = resolveLocation(dialect.getDatabaseId(), operation, module);
        Resource resource = SpringHolder.getResource(location);
        if (resource.exists()) {
            org.autumn.commons.jdbc.JdbcUtils.executeSchemaResource(connection, resource);
        } else {
            Logs.error(resource + "is not exist...");
        }
    }

    private String resolveLocation(String databaseId, String operation, String module) {
        return new StringBuilder()
                .append("classpath:/META-INF/db/")
                .append(operation)
                .append("/autumn.")
                .append(databaseId)
                .append(".")
                .append(operation)
                .append(".")
                .append(module)
                .append(".sql")
                .toString();
    }
}
