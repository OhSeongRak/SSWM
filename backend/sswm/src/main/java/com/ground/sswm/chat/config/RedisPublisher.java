package com.ground.sswm.chat.config;

import com.ground.sswm.chat.model.dto.ChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;


/**
 * 발행서비스 redis에서는 topic을 채팅방이라고 가정하고 pub/sub는 대화를하거나 보는 행위이다. 이때 채팅방에서 메세지를 작성하면 해당 메세지를 Topic에 발행하는
 * 기능이다. 이 메소드를 이용해 메세지를 발행하면 대기하던 redis 구독 서비스가 처리한다.
 */
@RequiredArgsConstructor
@Service
public class RedisPublisher {

    private final RedisTemplate<String, Object> redisTemplate;

    public void publish(ChannelTopic topic, ChatDto chatDto) {
        System.out.println("topic.toString() = " + topic.toString());
        System.out.println("message = " + chatDto);

        redisTemplate.convertAndSend(topic.getTopic(), chatDto);
    }
}
