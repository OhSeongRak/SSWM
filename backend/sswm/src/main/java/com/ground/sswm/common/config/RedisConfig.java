package com.ground.sswm.common.config;

import com.ground.sswm.auth.domain.Auth;
import com.ground.sswm.event.domain.StudyEvent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;

import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Value("${spring.redis.host}")
    private String host;

    @Value("${spring.redis.port}")
    private int port;

    @Value("${spring.redis.password}")
    private String password;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {

        RedisStandaloneConfiguration redisConfiguration = new RedisStandaloneConfiguration();
        redisConfiguration.setHostName(host);
        redisConfiguration.setPort(port);
        redisConfiguration.setPassword(password);
        LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory(redisConfiguration);

        return lettuceConnectionFactory;
    }

    /**
     * redis pub/sub 메시지를 처리하는 listener 설정
     */
    @Bean
    public RedisMessageListenerContainer redisMessageListener(RedisConnectionFactory connectionFactory) {

        RedisMessageListenerContainer container = new RedisMessageListenerContainer();

        container.setConnectionFactory(connectionFactory);

        return container;
    }

    /**
     * 어플리케이션에서 사용할 redisTemplate 설정
     */
    @Primary
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(connectionFactory);

        redisTemplate.setKeySerializer(new StringRedisSerializer());

        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));
        return redisTemplate;
    }

    @Bean
    public RedisTemplate<String, Auth> redisAuthTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Auth> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        // Use Jackson2JsonRedisSerializer to serialize/deserialize Auth objects as JSON
        Jackson2JsonRedisSerializer<Auth> jsonSerializer = new Jackson2JsonRedisSerializer<>(
            Auth.class);

        // Set String serializer for keys
        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());

        // Set JSON serializer for values
        template.setValueSerializer(jsonSerializer);
        template.setHashValueSerializer(jsonSerializer);

        return template;
    }

    @Bean
    public RedisTemplate<String, Long> redisEventTemplate(RedisConnectionFactory connectionFactory){
        RedisTemplate<String, Long> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);


        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());

        template.setValueSerializer(new GenericToStringSerializer<>(Long.class));
        template.setHashValueSerializer(new GenericToStringSerializer<>(Long.class));


        return template;
    }
}