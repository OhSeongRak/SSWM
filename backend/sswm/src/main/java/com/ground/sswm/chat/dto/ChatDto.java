package com.ground.sswm.chat.dto;

import javax.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
public class ChatDto {

    // 메시지 타입 : 입장, 채팅
    public enum MessageType {
        ENTER, TALK
    }

    public MessageType getType() {
        return type;
    }

    private MessageType type; // 메시지 타입

    private Long studyroomId; // 방번호
    private Long userId; // 유저번호
    private String nickname; // 유저닉네임
    private String content; // 메시지
    private int createdAt;
}
