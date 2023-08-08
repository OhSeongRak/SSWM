package com.ground.sswm.chat.service;

import com.ground.sswm.chat.config.RedisSubscriber;
import com.ground.sswm.chat.exception.ChatroomNotFoundException;
import com.ground.sswm.chat.model.Chat;
import com.ground.sswm.chat.model.dto.ChatDto;
import com.ground.sswm.chat.model.dto.ChatDto.MessageType;
import com.ground.sswm.chat.repository.ChatRepository;
import com.ground.sswm.studyroom.exception.StudyroomNotFoundException;
import com.ground.sswm.studyroom.model.Studyroom;
import com.ground.sswm.studyroom.repository.StudyroomRepository;
import com.ground.sswm.user.exception.UserNotFoundException;
import com.ground.sswm.user.model.User;
import com.ground.sswm.user.repository.UserRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {


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
    @Override
    public void enterChatRoom(Long studyroomId) {
        Optional<Studyroom> findRoom = studyroomRepository.findById(studyroomId);
        if (findRoom.isEmpty()) {
            throw new ChatroomNotFoundException("채팅룸이 존재하지 않습니다.");
        }

        ChannelTopic topic = topics.get(studyroomId);
        if (topic == null) {
            topic = new ChannelTopic(findRoom.get().getName());
        }
        redisMessageListener.addMessageListener(redisSubscriber, topic);
        topics.put(studyroomId, topic);
    }

    @Override
    public ChannelTopic getTopic(Long studyroomId) {
        return topics.get(studyroomId);
    }

    /**
     * 채팅 생성
     *
     * @param studyroomId 채팅방 id
     * @param userId      보낸이
     * @param content     내용
     */
    @Override
    public ChatDto createChat(Long studyroomId, Long userId, String content, MessageType type) {
        //방 찾기 -> 없는 방일 경우 여기서 예외처리
        Studyroom findStudyroom = studyroomRepository.findById(studyroomId)
            .orElseThrow(() -> new StudyroomNotFoundException("없는 스터디룸입니다."));
        User findUser = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException("없는 유저입니다."));

        chatRepository.save(Chat.createChat(findStudyroom, findUser, content));

        return ChatDto.builder()
            .studyroomId(studyroomId)
            .userId(userId)
            .content(content)
            .type(type)
            .build();
    }

    /**
     * 채팅방 채팅내용 불러오기
     *
     * @param studyroomId 채팅방 id
     */
    @Override
    public List<ChatDto> findAllChatByStudyroomId(Long studyroomId) {
        List<Chat> findChats = chatRepository.findAllByStudyroomId(studyroomId);

        List<ChatDto> findChatDtos = findChats.stream()
            .map(x -> ChatDto.from(x))
            .toList();

        return findChatDtos;
    }

}
