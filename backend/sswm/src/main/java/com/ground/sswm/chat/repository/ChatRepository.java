package com.ground.sswm.chat.repository;


import com.ground.sswm.chat.model.Chat;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface ChatRepository extends CrudRepository<Chat, Long> {

    List<Chat> findAllByStudyroomId(Long studyroomId);
}
