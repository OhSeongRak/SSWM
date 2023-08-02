import React from "react";
import styled from "styled-components";
import Cal from "./Cal";
// import MyResponsivePie from "./Chart";
import Piechart from "./Chart";

const Calendar = (props) => {
  return (
    <ContainerWrap>
      <TitleWrap>
        <Title>달력</Title>
      </TitleWrap>
      <ContentWrap>
        <CalendarWrap>
          <Cal />
        </CalendarWrap>
        <GraphWrap>
          그래프
          <Piechart></Piechart>
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
