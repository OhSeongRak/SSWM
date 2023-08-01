package com.ground.sswm.chat.service;

import com.amazonaws.Response;
import com.ground.sswm.chat.domain.Chat;
import com.ground.sswm.chat.dto.ChatDto;
import com.ground.sswm.chat.dto.ChatDto.MessageType;
import com.ground.sswm.chat.pubsub.RedisSubscriber;
import com.ground.sswm.chat.repo.ChatRepository;
import com.ground.sswm.studyroom.domain.Studyroom;
import com.ground.sswm.studyroom.domain.StudyroomRepository;
import com.ground.sswm.user.domain.User;
import com.ground.sswm.user.domain.UserRepository;
import com.ground.sswm.user.service.UserService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {


    // 채팅방(topic)에 발행되는 메시지를 처리할 Listner
    private final RedisMessageListenerContainer redisMessageListener;
    // 구독 처리 서비스
    private final RedisSubscriber redisSubscriber;

    private final StudyroomRepository studyroomRepository;
    private final UserRepository userRepository;
    private final ChatRepository chatRepository;

    // Redis
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, Long, Studyroom> opsHashChatRoom;

    // 채팅방의 대화 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 roomId로 찾을수 있도록 한다.
    private Map<Long, ChannelTopic> topics;



    @PostConstruct
    private void init() {
        opsHashChatRoom = redisTemplate.opsForHash();
        topics = new HashMap<>();
    }


    /**
     * 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
     */
    public void enterChatRoom(Long studyroomId) {
        Optional<Studyroom> findRoom = studyroomRepository.findById(studyroomId);
        if (findRoom.isEmpty()) {
            // 방이 존재하지 않는다고 알려줘야하는데..??
            return;
        }

        ChannelTopic topic = topics.get(studyroomId);
        if (topic == null) {
            topic = new ChannelTopic(findRoom.get().getName());
        }
        redisMessageListener.addMessageListener(redisSubscriber, topic);
        topics.put(studyroomId, topic);
    }

    public ChannelTopic getTopic(Long studyroomId) {
        return topics.get(studyroomId);
    }

    /**
     * 채팅 생성
     * @param studyroomId 채팅방 id
     * @param userId 보낸이
     * @param content 내용
     */
    public ChatDto createChat(Long studyroomId, Long userId, String content, MessageType type) {
        //방 찾기 -> 없는 방일 경우 여기서 예외처리
        Optional<Studyroom> findStudyroom = studyroomRepository.findById(studyroomId);
        Optional<User> findUser = userRepository.findById(userId);

        if (findStudyroom.isEmpty()) {
            return null;
        }
        if (findUser.isEmpty()) {
            return null;
        }

        chatRepository.save(Chat.createChat(findStudyroom.get(), findUser.get(), content));

        return ChatDto.builder()
            .studyroomId(studyroomId)
            .userId(userId)
            .content(content)
            .type(type)
            .build();
    }

    /**
     * 채팅방 채팅내용 불러오기
     * @param studyroomId 채팅방 id
     */
    public List<ChatDto> findAllChatByStudyroomId(Long studyroomId) {
        List<Chat> findChats = chatRepository.findAllByStudyroomId(studyroomId);

        List<ChatDto> findChatDtos = new ArrayList<>();
        for (Chat findChat : findChats) {
            ChatDto chatDto = new ChatDto();

            chatDto.setContent(findChat.getContent());
            chatDto.setUserId(findChat.getUser().getId());
            chatDto.setStudyroomId(findChat.getStudyroom().getId());

            findChatDtos.add(chatDto);
        }

        return findChatDtos;
    }

}
