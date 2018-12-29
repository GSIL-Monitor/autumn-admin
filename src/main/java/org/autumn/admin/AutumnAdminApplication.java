package org.autumn.admin;

import org.autumn.admin.common.CommonAutoConfiguration;
import org.autumn.commons.web.swagger.EnableAutumnSwagger2;
import org.autumn.security.EnableAutumnWebSecurity;
import org.autumn.security.authentication.AuthenticationHandlerProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableCaching
@EnableAutumnSwagger2
@EnableAutumnWebSecurity
@SpringBootApplication
@Import({
        CommonAutoConfiguration.class
})
public class AutumnAdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(AutumnAdminApplication.class, args);
    }

    @Configuration
    static class SecurityAutoConfiguration extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {

        @Autowired
        private AuthenticationHandlerProvider authenticationHandlerProvider;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            // @formatter:off
            http.authorizeRequests()
                    // 这些URL不校验
                    .antMatchers("/", "/easyui/**")
                    .permitAll()
                    // 其它的都需要校验
                    .anyRequest()
                    .authenticated()
                    .and()
                    // 禁用http-basic认证
                    .httpBasic().disable()
                    // 启用Form表单认证
                    .formLogin()
                    .loginPage("/").loginProcessingUrl("/v1/login")
                    .and()
                    // 登出
                    .logout()
                    .and()
                    // 添加自定义认证提供器
                    .authenticationProvider(authenticationHandlerProvider);
            // @formatter:on
        }

        @Override
        public void addViewControllers(ViewControllerRegistry registry) {
            registry.addViewController("/").setViewName("/easyui/index.html");
        }
    }
}
