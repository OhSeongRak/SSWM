import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import Piechart from "./Chart";
import moment from "moment";
import "./Calendar.css";

const ScheduleCalendar = (props) => {
  const [selectedDateRange, setSelectedDateRange] = useState([
    new Date(),
    new Date(),
  ]);

  const [calendarDto, setcalendarDto] = useState([]);

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const handleDateChange = (date) => {
    const unixTimestampDates = date.map((d) => d.getTime());
    setSelectedDateRange(unixTimestampDates);
  };

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
        setcalendarDto(response.data);
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
          <Calendar
            onChange={handleDateChange}
            value={selectedDateRange.map((timestamp) => new Date(timestamp))}
            selectRange={true}
            formatDay={(locale, date) => moment(date).format("D")}
            locale="en-US"
          />
          <div>
            <p>
              {new Date(selectedDateRange[0]).toLocaleDateString()} ~{" "}
              {new Date(selectedDateRange[1]).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h2>
              기간 내 총 공부시간 {Math.floor(calendarDto.studyTime / 60)}시간 :{" "}
              {calendarDto.studyTime % 60}분
            </h2>
          </div>
        </CalendarWrap>
        <GraphWrap>
          그래프
          <Piechart calendarDto={calendarDto}></Piechart>
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

const Dot = styled.div`
  height: 8px;
  width: 8px;
  background-color: #f87171;
  border-radius: 50%;
  display: flex;
  margin-left: 1px;
`;
export default ScheduleCalendar;
