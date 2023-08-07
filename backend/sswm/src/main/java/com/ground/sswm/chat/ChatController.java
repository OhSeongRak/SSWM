package com.ground.sswm.chat;

import com.ground.sswm.chat.config.RedisPublisher;
import com.ground.sswm.chat.model.dto.ChatDto;
import com.ground.sswm.chat.service.ChatServiceImpl;
import com.ground.sswm.studyroom.exception.StudyroomNotFoundException;
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
    private final ChatServiceImpl chatServiceImpl;
    private final UserService userService;

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    // 여기서 채팅 저장
    @MessageMapping("/chat/message")
    public void message(ChatDto chatDto) {
        chatDto.setNickname(userService.getUserDto(chatDto.getUserId()).getNickname());

        log.debug("ChatDto :" + chatDto);

        if (chatDto.getStudyroomId() == null) {
            throw new StudyroomNotFoundException("스터디룸 없음");
        }

        if (ChatDto.MessageType.ENTER.equals(chatDto.getType())) {
            chatServiceImpl.enterChatRoom(Long.valueOf(chatDto.getStudyroomId()));
            chatDto.setContent("[" + chatDto.getNickname() + "]" + "님이 입장하셨습니다.");
        }

        chatServiceImpl.createChat(Long.valueOf(chatDto.getStudyroomId()), chatDto.getUserId(),
            chatDto.getContent(), chatDto.getType());

        // Websocket에 발행된 메시지를 redis로 발행한다(publish)
        redisPublisher.publish(chatServiceImpl.getTopic(Long.valueOf(chatDto.getStudyroomId())),
            chatDto);
    }
}
