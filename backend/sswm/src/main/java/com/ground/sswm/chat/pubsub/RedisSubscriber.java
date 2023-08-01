package com.ground.sswm.chat.pubsub;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ground.sswm.chat.dto.ChatDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber implements MessageListener {

    private final ObjectMapper objectMapper;
    private final RedisTemplate redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    /**
     * Redis에서 메시지가 발행(publish)되면 대기하고 있던 onMessage가 해당 메시지를 받아 처리한다.
     */
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            // redis에서 발행된 데이터를 받아 deserialize
            String publishMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
            // ChatDto 객채로 맵핑
            ChatDto roomMessage = objectMapper.readValue(publishMessage, ChatDto.class);
            System.out.println("roomMessage.getContent() = " + roomMessage.getContent());
            System.out.println("roomMessage.getStudyroomId() = " + roomMessage.getStudyroomId());
            System.out.println("roomMessage.getUserId() = " + roomMessage.getUserId());
            // Websocket 구독자에게 채팅 메시지 Send
            messagingTemplate.convertAndSend("/sub/chat/room/" + roomMessage.getStudyroomId(), roomMessage);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
