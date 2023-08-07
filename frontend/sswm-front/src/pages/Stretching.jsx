import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

import Gnb from "../components/Gnb";
import Button from "@mui/material/Button";

const Streching = () => {
  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <HeaderWrap>
          * 점수 판정 기준 : Excellent 100 - 80, Good 80 - 60, nice 60 - 40, Bad 40 -
        </HeaderWrap>

        <ContentWrap>
          <ContentLeftWrap> {/* 요가 사진 */} 
            <ContentTimerWrap>요가 타이머</ContentTimerWrap>
            <ContentViewWrap>요가 이미지</ContentViewWrap>
            <ContentScoreWrap>누적점수</ContentScoreWrap>
          </ContentLeftWrap>

          <ContentRightWrap> {/* 유저 화면 */}
            <ContentTimerWrap>유저 타이머</ContentTimerWrap>
            <ContentViewWrap>유저 화면</ContentViewWrap>
            <ContentTextWrap>점수 판정이 뜰 때까지 자세를 유지해주세요.</ContentTextWrap>
          </ContentRightWrap>
        </ContentWrap>

        <FooterWrap>
          <Link to="/LiveRoom">
            <Button variant="outlined">나가기</Button>
          </Link>
        </FooterWrap>
      </ContainerWrap>
    </div>
  );
};

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
`
const HeaderWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  height: 5%;
  font-family: "NanumSquareNeo";
`
const ContentWrap = styled.div`
  display: flex;
  width: 90%;
  height: 90%;
`
const ContentLeftWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 40%;
  height: 100%;
`
const ContentRightWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 60%;
  hgieht: 100%;
`
const ContentTimerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  font-size: 3vw;
  font-family: "NanumSquareNeo";
`
const ContentViewWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 60%;
  border: 1px solid black;
`
const ContentScoreWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  font-size: 3vw;
  font-family: "NanumSquareNeo";
`
const ContentTextWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  font-size: 1vw;
  font-family: "NanumSquareNeo";
`
const FooterWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;  
  width: 90%;
  height:5%;
`


export default Streching;