package com.ground.sswm.dailyLog.repository;

import com.ground.sswm.dailyLog.model.DailyLog;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyLogRepository extends
    JpaRepository<DailyLog, Long> {

    // [24시간마다 - 4am] MySQL -> MySQL 배치 작업에 사용
    @Query("select dl from DailyLog dl where dl.date >= :start and dl.date < :end")
    List<DailyLog> findAllDateBetween(long start, long end);

    //해당하는 스터디룸에서 start부터 end날짜 사이에 유저가 공부한 기록 select(기간)
    List<DailyLog> findAllByUserIdAndStudyroomIdAndDateBetween(Long userId,
        Long studyroomId, long startDate, long endDate);

    // 전체 스터디룸에서 start부터 end날짜 사이에 유저가 공부한 기록 select(기간)
    List<DailyLog> findAllByUserIdAndDateBetween(Long userId,
        long startDate, long endDate);

    //TODO: 왜 하루를 가져오는데 between이 필요한건지?
    //해당하는 스터디룸에서 해당 날짜에 유저가 공부한 기록 select(하루)
    @Query("select dl from DailyLog dl "
        + "where dl.user.id=:userId and dl.studyroom.id=:studyroomId and "
        + "dl.date >= :startOfDay and dl.date < :endOfDay")
    Optional<DailyLog> findByUserIdAndStudyroomIdAndDateBetween(Long userId, Long studyroomId,
        long startOfDay, long endOfDay);

    //해당하는 스터디룸에서 해당 날짜에 유저가 얼마나 공부했는지로 정렬해서 3명 select(3명)
    //공부량 top3 조회에서 필요
    List<DailyLog> findTop3ByStudyroomIdAndDateOrderByStudyTimeDesc(Long studyroomId, long date);

    //해당하는 스터디룸에서 기간 사이에 유저가 얼마나 출석했는지
    int countByUserIdAndStudyroomIdAndDateBetween(Long userId, Long studyroomId, long startDate,
        long endDate);

    DailyLog findAllByUserIdAndStudyroomIdAndDate(Long userId, Long studyroomId, Long date);
}
