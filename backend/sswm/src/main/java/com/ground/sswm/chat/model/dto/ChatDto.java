package com.ground.sswm.chat.model.dto;

import com.ground.sswm.chat.model.Chat;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatDto {

    // 메시지 타입 : 입장, 채팅
    public enum MessageType {
        ENTER, TALK
    }


    private MessageType type; // 메시지 타입

    private Long studyroomId; // 방번호
    private Long userId; // 유저번호
    private String nickname; // 유저닉네임
    private String content; // 메시지
    private long createdAt;

    @Builder
    public ChatDto(MessageType type, Long studyroomId, Long userId, String nickname, String content,
        long createdAt) {
        this.type = type;
        this.studyroomId = studyroomId;
        this.userId = userId;
        this.nickname = nickname;
        this.content = content;
        this.createdAt = createdAt;
    }

    public static ChatDto from(Chat chat) {
        return ChatDto.builder()
            .content(chat.getContent())
            .userId(chat.getUser().getId())
            .studyroomId(chat.getStudyroom().getId())
            .build();
    }
}
