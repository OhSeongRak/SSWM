package com.ground.sswm.dailyLog.service;

import com.ground.sswm.dailyLog.model.dto.CalenderDto;
import com.ground.sswm.dailyLog.model.dto.DailyLogDto;
import java.util.List;

public interface DailyLogService {
    void create(Long studyroomId, Long userId);
    CalenderDto selcectDailyLogsByUserId(Long userId, long start, long end);
    DailyLogDto getDailylog(Long userId, Long studyroomId);
    void setStretchingScore(Long userId, Long studyroomId, int score);
}
