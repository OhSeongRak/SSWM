import React from "react";
import styled from "styled-components";
import Gnb from "../components/Gnb";
import { Link } from 'react-router-dom';

import StudyRoomMemberIcon from "../components/StudyRoom/StudyRoomMemberIcon";
import StudyRoomMemberScore from "../components/StudyRoom/StudyRoomMemberScore";
import StudyRoomMemberChat from "../components/StudyRoom/StudyRoomMemberChat";
import StudyRoomMemberTime from "../components/StudyRoom/StudyRoomMemberTime";
import StudyRoomMemberBoard from "../components/StudyRoom/StudyRoomMemberBoard";

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';

const StudyRoomMember = () => {
  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <HeaderWrap>
          <HeaderTitle>
            공부할사람~
            <HeaderBtnWrap>
            <Link to="/StudyRoomAdmin" style={{ textDecoration: "none" }}>
              <IconButton aria-label="setting" size="large">
                <SettingsIcon fontSize="inherit" />
              </IconButton>
            </Link>
            </HeaderBtnWrap>
          </HeaderTitle>
          <HeaderBtn>
            <Button variant="contained" color="success">
              스터디룸 탈퇴하기
            </Button>
            <Link to="/LiveRoom" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                라이브 입장
              </Button>
            </Link>
          </HeaderBtn>
        </HeaderWrap>

        <ContentWrap>
          <ContentLeftWrap>
            <StudyMemberWrap>
              <StudyRoomMemberIcon />
            </StudyMemberWrap>
            <StudyScoreWrap>
              <StudyRoomMemberScore />
            </StudyScoreWrap>
            <StudyChatWrap>
              <StudyRoomMemberChat />
            </StudyChatWrap>
          </ContentLeftWrap>

          <ContentRightWrap>
            <StudyRoomTimeWrap>
              <StudyRoomMemberTime />
            </StudyRoomTimeWrap>
            <StudyRoomBoardWrap>
              <StudyRoomMemberBoard />
            </StudyRoomBoardWrap>
          </ContentRightWrap>
        </ContentWrap>
      </ContainerWrap>
    </div>
  )
}

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`
const HeaderWrap = styled.div`
  display: flex;
  width: 80%;
  height: 10%;
`
const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 100%;
  border: 1px solid black;
  border-radius: 15px;
  font-size: 30px;
  font-family: "NanumSquareNeo";
`
const HeaderBtnWrap = styled.span`
  display: flex;
`
const HeaderBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 100%;
  gap: 1vw;
`
const ContentWrap = styled.div`
  display: flex;
  width: 80%;
  height: 90%;
  margin-top: 2vw;
`
const ContentLeftWrap = styled.div`
  width: 70%;
  height: 100%;
`
const StudyMemberWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
  gap: 1vw;
`
const StudyScoreWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40%;
`
const StudyChatWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40%;
`
const ContentRightWrap = styled.div`
  width: 30%;
  height: 100%;
`
const StudyRoomTimeWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 35%;
`
const StudyRoomBoardWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 65%;
`
export default StudyRoomMember;