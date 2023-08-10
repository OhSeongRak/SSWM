import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ScheduleCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Piechart from "./Chart";

const Calendar = (props) => {
  const [selectedDateRange, setSelectedDateRange] = useState([
    new Date(),
    new Date(),
  ]);

  const [dailyLog, setdailyLog] = useState([]);

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const handleDateChange = (date) => {
    const unixTimestampDates = date.map((d) => d.getTime());
    setSelectedDateRange(unixTimestampDates);
  };

  const studyTime = dailyLog.reduce((total, log) => total + log.studyTime, 0);

  useEffect(() => {
    console.log(selectedDateRange);
    axios
      .get("/api/user-logs", {
        params: {
          start: selectedDateRange[0],
          end: selectedDateRange[1],
        },
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setdailyLog(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, [selectedDateRange]);

  return (
    <ContainerWrap>
      <TitleWrap>
        <Title>달력</Title>
      </TitleWrap>
      <ContentWrap>
        <CalendarWrap>
          <ScheduleCalendar
            onChange={handleDateChange}
            value={selectedDateRange.map((timestamp) => new Date(timestamp))}
            selectRange={true}
            
          />
          <div>
            <p>
              {new Date(selectedDateRange[0]).toLocaleDateString()} ~{" "}
              {new Date(selectedDateRange[1]).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h2>
              기간 내 총 공부시간 {Math.floor(studyTime / 60)}시간 :{" "}
              {studyTime % 60}분
            </h2>
          </div>
        </CalendarWrap>
        <GraphWrap>
          그래프
          <Piechart dailyLog={dailyLog}></Piechart>
        </GraphWrap>
      </ContentWrap>
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  width: 100%;
`;
const TitleWrap = styled.div`
  font-size: 25px;
  margin-top: 1vw;
  margin-bottom: 1vw;
`;
const Title = styled.span`
  border: 2px solid #fecc47;
  border-radius: 15px;
  padding: 3px 3px;
  background: #fecc47;
  font-family: "NanumSquareNeo";
`;
const ContentWrap = styled.div`
  display: flex;
`;
const CalendarWrap = styled.div`
  height: 5 00px;
  width: 60%;
`;
const GraphWrap = styled.div`
  height: 400px;
  width: 60%;
  border: 2px solid orange;
  border-radius: 15px;
`;
export default Calendar;
