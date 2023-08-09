import React from 'react';
import styled from 'styled-components';


const StudyRoomMemberTime = ({studyAvgTime, maxAvgTime}) => {
  console.log(studyAvgTime);
  return (
    <ContainerWrap>
      <TimeWrap>
        <TimeTitle>
          스터디룸 평균 공부 시간
        </TimeTitle>
        <TimeContent>
          {studyAvgTime}
        </TimeContent>
      </TimeWrap>
      <TimeWrap>
        <TimeTitle>
          일일 할당 휴식시간
        </TimeTitle>
        <TimeContent>
          {maxAvgTime}
        </TimeContent>
      </TimeWrap>
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 1vw;
`
const TimeWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 40%;
  gap: 1vw;
  font-family: "NanumSquareNeo";  
`
const TimeTitle = styled.div`
  font-size: 17px;
`
const TimeContent = styled.div`
  font-size: 25px;
`


export default StudyRoomMemberTime;