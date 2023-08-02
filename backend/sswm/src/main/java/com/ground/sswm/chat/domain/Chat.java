package com.ground.sswm.chat.domain;

import static javax.persistence.FetchType.LAZY;

import com.ground.sswm.studyroom.domain.Studyroom;
import com.ground.sswm.user.domain.User;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;

//@RedisHash
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "STUDYROOM_ID")
    private Studyroom studyroom;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(updatable = false)
    private long createdAt;


    @Builder
    public Chat(Studyroom studyroom, User user, String content, long createdAt) {
        this.studyroom = studyroom;
        this.user = user;
        this.content = content;
        this.createdAt = createdAt;
    }

    /**
     * 채팅 생성
     *
     * @param studyroom  채팅 방
     * @param user  보낸이
     * @param content 내용
     * @return Chat Entity
     */
    public static Chat createChat(Studyroom studyroom, User user, String content) {
        return Chat.builder()
            .studyroom(studyroom)
            .user(user)
            .content(content)
            .build();
    }

    public static Chat createSender(User user) {
        return Chat.builder()
            .user(user)
            .build();
    }
}
