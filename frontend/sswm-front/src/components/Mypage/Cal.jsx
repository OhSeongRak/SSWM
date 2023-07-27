import React, { useState } from 'react';
import './Calendar.css'; // Calendar 스타일을 정의하는 CSS 파일

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedules, setSchedules] = useState({});

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const selectedDate = new Date(year, month, day);
    const key = selectedDate.toISOString().slice(0, 10); // yyyy-mm-dd 형식으로 변환

    const schedule = prompt('일정을 입력하세요:');
    if (schedule) {
      setSchedules((prevSchedules) => ({ ...prevSchedules, [key]: schedule }));
    }
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const blanks = new Array(firstDayOfMonth).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    return (
      <div className="calendar">
        <div className="calendar__header">
          <button onClick={prevMonth}>Previous</button>
          <h2>{year}년 {month + 1}월</h2>
          <button onClick={nextMonth}>Next</button>
        </div>
        <div className="calendar__days">
          <div className="calendar__day">일</div>
          <div className="calendar__day">월</div>
          <div className="calendar__day">화</div>
          <div className="calendar__day">수</div>
          <div className="calendar__day">목</div>
          <div className="calendar__day">금</div>
          <div className="calendar__day">토</div>
          {[...blanks, ...days].map((day, index) => (
            <div key={index} className={`calendar__date ${index < firstDayOfMonth ? 'calendar__date--blank' : ''}`}
              onClick={() => handleDateClick(day)}>
              {day}
              {schedules[`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`] &&
                <div className="schedule">{schedules[`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`]}</div>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return renderCalendar();
};

export default Calendar;
