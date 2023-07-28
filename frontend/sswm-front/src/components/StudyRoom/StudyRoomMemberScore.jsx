import React from 'react';
import styled from 'styled-components';


const StudyRoomMemberScore = () => {
  return (
    <ContainerWrap>
      <ScoreWrap>
        <ContentWrap>
          <ContentTitle>
            일일 공부왕
          </ContentTitle>
          <ContentRank>
            이미지 추가
          </ContentRank>
        </ContentWrap>

        <ContentWrap>
          <ContentTitle>
            7월 출석왕
          </ContentTitle>
          <ContentRank>
            이미지 추가
          </ContentRank>
        </ContentWrap>
      </ScoreWrap>
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
const ScoreWrap = styled.div`
  display: flex;
  width: 90%;
  height: 90%;
  gap: 3vw;
`
const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: 100%;
  border: 1px solid black;
`
const ContentTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;
  border-bottom: 1px solid black;
`
const ContentRank = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90%;
`

export default StudyRoomMemberScore;