package com.ground.sswm.dailyLog.service;

import com.ground.sswm.dailyLog.model.dto.DailyLogDto;
import java.util.List;

public interface DailyLogService {
    void create(Long studyroomId, Long userId);
    List<DailyLogDto> totalStudyTime(Long userId, long start, long end);

    DailyLogDto getDailylog(Long userId, Long studyroomId);
}
