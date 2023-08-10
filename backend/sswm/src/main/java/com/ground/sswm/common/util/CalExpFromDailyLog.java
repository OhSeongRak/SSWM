package com.ground.sswm.common.util;

public class CalExpFromDailyLog {
    public static int calExp(long studyTime, long restTime, int stretchScore){
        int studyMin = (int) studyTime / 60;
        int restMin = (int) restTime / 60;

        int exp = 100;
        exp *= Math.min(studyMin, 500)/500;
        exp *= 0.7 + 0.3 * (
            Math.min(restMin + stretchScore / 30, studyMin / 5) /
                (studyMin / 5)
        );

        return exp;
    }
}
