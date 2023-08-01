package com.ground.sswm.chat.controller;

import com.ground.sswm.chat.dto.ChatDto;
import com.ground.sswm.chat.pubsub.RedisPublisher;
import com.ground.sswm.chat.service.ChatService;
import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final ChatService chatService;
    private final UserService userService;

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    // 여기서 채팅 저장
    @MessageMapping("/chat/message")
    public void message(ChatDto chatDto) {
        // 유저를 찾아와서
        UserDto userDto = userService.getUserDto(chatDto.getUserId());

        // 닉네임을 넣어준다
        chatDto.setNickname(userDto.getNickname());

        log.debug("ChatDto :" + chatDto );

        if (chatDto.getStudyroomId() == null) {
            return;
        }
        if (ChatDto.MessageType.ENTER.equals(chatDto.getType())) {
            chatService.enterChatRoom(Long.valueOf(chatDto.getStudyroomId()));

            chatDto.setContent(chatDto.getNickname() + "님이 입장하셨습니다.");
        }

        chatService.createChat(Long.valueOf(chatDto.getStudyroomId()), chatDto.getUserId(), chatDto.getContent(), chatDto.getType());


        // Websocket에 발행된 메시지를 redis로 발행한다(publish)
        redisPublisher.publish(chatService.getTopic(Long.valueOf(chatDto.getStudyroomId())), chatDto);
    }
}
