import React from 'react';
import styled from "styled-components";

import StudyRoomItem from '../StudyRoom/StudyRoomItem';

const MyStudyRoom = (props) => {
  return(
    <ContainerWrap>
      <TitleWrap>
        <Title>내 스터디룸</Title>
      </TitleWrap>
      <ContentWrap>
        <StudyRoomWrap>
          <StudyRoomItem/ >
          <StudyRoomItem/ >
          <StudyRoomItem/ >
        </StudyRoomWrap>
      </ContentWrap>
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  width: 100%;
`
const TitleWrap = styled.div`
  font-size: 25px;
  margin-top: 1vw;
  margin-bottom: 1vw;
`
const Title = styled.span`
  border: 2px solid #fecc47;
  border-radius: 15px;
  padding: 3px 3px;
  background: #fecc47;
  font-family: "NanumSquareNeo";
`
const ContentWrap = styled.div`
  
`
const StudyRoomWrap = styled.div`
  display: flex;
  witdh: 100%;
  height: 350px;
` 
export default MyStudyRoom;