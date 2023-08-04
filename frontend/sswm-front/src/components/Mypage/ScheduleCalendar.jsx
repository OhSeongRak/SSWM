import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ScheduleCalendar = () => {
  const [selectedDateRange, setSelectedDateRange] = useState([new Date(), new Date()]);
  const [scheduleData, setScheduleData] = useState({});

  const handleDateChange = (date) => {
    setSelectedDateRange(date);
  };

  const handleAddSchedule = (event) => {
    event.preventDefault();
    const newSchedule = prompt('공부시간을 입력하세요:');
    if (newSchedule) {
      const startDate = selectedDateRange[0].toDateString();
      // const endDate = selectedDateRange[1].toDateString();
      for (const date = new Date(startDate); date <= selectedDateRange[1]; date.setDate(date.getDate() + 1)) {
        setScheduleData((prevData) => ({
          ...prevData,
          [date.toDateString()]: newSchedule,
        }));
      }
    }
  };

  const handleDeleteSchedule = (event) => {
    event.preventDefault();
    const dateToDelete = selectedDateRange[0].toDateString();
    if (scheduleData[dateToDelete]) {
      const newData = { ...scheduleData };
      delete newData[dateToDelete];
      setScheduleData(newData);
    }
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={selectedDateRange}
        selectRange={true}
      />
      <button onClick={handleAddSchedule}>추가</button>
      <button onClick={handleDeleteSchedule}>삭제</button>
      <div>
        <p>
          {selectedDateRange[0].toDateString()} ~ {selectedDateRange[1].toDateString()}
        </p>
      </div>
      <div>
        <h2>공부시간</h2>
        <ul>
          {Object.entries(scheduleData).map(([date, schedule]) => (
            <li key={date}>
              <strong>{date}:</strong> {schedule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScheduleCalendar;
