package com.ground.sswm.dailyLog.service;


import com.ground.sswm.dailyLog.domain.DailyLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DailyLogServiceImpl implements DailyLogService {

    private final DailyLogRepository dailyLogRepository;

}
