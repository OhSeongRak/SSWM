package com.ground.sswm.chat.service;

import com.ground.sswm.chat.dto.ChatDto;
import com.ground.sswm.chat.dto.ChatDto.MessageType;
import java.util.List;
import org.springframework.data.redis.listener.ChannelTopic;

public interface ChatService {

    void enterChatRoom(Long studyroomId);

    ChannelTopic getTopic(Long studyroomId);

    ChatDto createChat(Long studyroomId, Long userId, String content, MessageType type);

    List<ChatDto> findAllChatByStudyroomId(Long studyroomId);
}
