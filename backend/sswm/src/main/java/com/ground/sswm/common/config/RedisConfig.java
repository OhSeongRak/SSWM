package com.ground.sswm.common.config;

import com.ground.sswm.auth.domain.Auth;
import com.ground.sswm.event.domain.StudyEvent;
import com.ground.sswm.event.dto.StudyEventDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Value("${spring.redis.host}")
    private String host;

    @Value("${spring.redis.port}")
    private int port;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory(host, port);
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
    public RedisTemplate<String, StudyEvent> redisEventTemplate(RedisConnectionFactory connectionFactory){
        RedisTemplate<String, StudyEvent> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        Jackson2JsonRedisSerializer<StudyEvent> jsonSerializer = new Jackson2JsonRedisSerializer<>(
            StudyEvent.class);

        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());

        template.setValueSerializer(jsonSerializer);
        template.setHashValueSerializer(jsonSerializer);

        return template;
    }
}