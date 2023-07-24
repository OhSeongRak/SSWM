package com.ground.sswm.dailyLog.service;


import com.ground.sswm.dailyLog.domain.DailyLogRepository;
import com.ground.sswm.dailyLog.dto.DailyLogDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DailyLogServiceImpl implements DailyLogService {

    private final DailyLogRepository dailyLogRepository;

}
