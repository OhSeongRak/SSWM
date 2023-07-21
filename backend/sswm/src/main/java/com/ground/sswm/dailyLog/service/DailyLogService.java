package com.ground.sswm.dailyLog.service;

import com.ground.sswm.dailyLog.domain.DailyLog;
import com.ground.sswm.dailyLog.dto.DailyLogDto;
import java.util.List;

public interface DailyLogService {
    List<DailyLogDto> getDailyLogs(Long userId, Long studyroomId, int startDate, int endDate);




}
