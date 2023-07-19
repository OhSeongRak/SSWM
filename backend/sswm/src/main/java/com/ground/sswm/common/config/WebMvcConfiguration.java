package com.ground.sswm.common.config;


import java.util.Arrays;
import java.util.List;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {
    //TODO: http method check
    private final List<String> PATTERNS = Arrays.asList("/users/**","/articles/**/edit","/like-places/**");

    private JwtInterceptor jwtInterceptor;

    public WebMvcConfiguration(JwtInterceptor jwtInterceptor) {
        this.jwtInterceptor = jwtInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // registry.addInterceptor(jwtInterceptor).addPathPatterns(PATTERNS);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // TODO: setting pattern CORS
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);;

    }


}
