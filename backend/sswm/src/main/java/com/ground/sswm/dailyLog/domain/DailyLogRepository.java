package com.ground.sswm.dailyLog.domain;

import com.ground.sswm.dailyLog.dto.DailyLogDto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyLogRepository extends JpaRepository<com.ground.sswm.dailyLog.domain.DailyLog, Long> {

    Optional<List<DailyLog>> findAllByUserIdAndStudyroomIdAndDateBetween(Long userId, Long studyroomId, int startDate, int endDate);

    Optional<DailyLog> findByUserIdAndStudyroomIdAndDate(Long userId, Long studyroomId, int date);

    List<DailyLog> findTop3ByStudyroomIdAndDateOrderByStudyTimeDesc(Long studyroomId, int date);
}
