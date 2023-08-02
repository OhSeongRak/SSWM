import React from 'react';
import styled from 'styled-components';

import rank from '../../assets/rank.JPG';

const StudyRoomMemberScore = () => {
  return (
    <ContainerWrap>
      <ScoreWrap>
        <ContentWrap>
          <ContentTitle>
            일일 공부왕
          </ContentTitle>
          <ContentRank>
            <ContentRankImg src={rank}/>
            <ContentRankValueWrap>
              <ContentRankValue>
                5:00:00
              </ContentRankValue>
              <ContentRankValue>
                15:00:00
              </ContentRankValue>
              <ContentRankValue>
                1:00:00
              </ContentRankValue>
            </ContentRankValueWrap>
          </ContentRank>
        </ContentWrap>

        <ContentWrap>
          <ContentTitle>
            7월 출석왕
          </ContentTitle>
          <ContentRank>
            <ContentRankImg src={rank} />
            <ContentRankValueWrap>
              <ContentRankValue>
                25/31
              </ContentRankValue>
              <ContentRankValue>
                30/31
              </ContentRankValue>
              <ContentRankValue>
                15/31
              </ContentRankValue>
            </ContentRankValueWrap>
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
  border: 3px solid #b2dfdb;
  border-radius: 15px;
  overflow: hidden;
`
const ContentTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;
  background-color: #b2dfdb;
  font-size: 15px;
  font-family: "NanumSquareNeo";
  border-bottom: 1px solid #b2dfdb;
`
const ContentRank = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 90%;
`
const ContentRankImg = styled.img`
  width: 80%;
  height: 80%;
`
const ContentRankValueWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 15%;
`
const ContentRankValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33%;
  height: 100%;
  font-family: "NanumSquareNeo";
`
export default StudyRoomMemberScore;