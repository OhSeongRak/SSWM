import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Gnb from "../components/Gnb";
import { Link } from "react-router-dom";

import StudyRoomMemberIcon from "../components/StudyRoom/StudyRoomMemberIcon";
import StudyRoomMemberScore from "../components/StudyRoom/StudyRoomMemberScore";
import StudyRoomMemberChat from "../components/StudyRoom/StudyRoomMemberChat";
import StudyRoomMemberTime from "../components/StudyRoom/StudyRoomMemberTime";
import StudyRoomMemberBoard from "../components/StudyRoom/StudyRoomMemberBoard";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import CustomModal from "../components/StudyRoom/deleteModal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Snackbar } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from 'axios';
import GFooter from "../components/GFooter";

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}

const StudyRoomMember = () => {
  const { studyroomId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studyroom, setStudyroom] = useState([]);
  const [studyAvgTime, setStudyAvgTime] = useState("");
  const [maxRestTime, setMaxRestTime] = useState("");

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  // Snackbar
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const openSnackBar = () => setIsSnackBarOpen(true);
  const closeSnackBar = () => setIsSnackBarOpen(false);
  
  const closeModalEvent = () => {
    setIsModalOpen(false);
    openSnackBar(); // Open the CustomSnackBar after closing the modal
  };
  
  useEffect(() => {
    // 스터디룸 관련 정보 조회
    axios
      .get(`/api/studyrooms/${studyroomId}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setStudyroom(response.data); // API 호출 완료 후에 studyrooms 업데이트
        console.log("studyroom", response.data);
        setStudyAvgTime(formatTime(response.data.studyAvgTime));
        setMaxRestTime(formatTime(response.data.maxRestTime));
      })
      .catch((error) => {
        console.log(error);
      });

    // 스터디룸 가입
    axios
    .post(`/api/studyrooms/${studyroomId}/join`, {}, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

    // 접속중인 유저들 정보
    axios
    .get(`/api/studyrooms/${studyroomId}/search-user`, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((response) => {
      console.log("userInfo", response.data);
    })
    .catch((error) => {
      console.log(error);
    });

    // 출석률 top3
    axios
    .get(`/api/studyrooms/${studyroomId}/daily-attend`, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((response) => {
      console.log("attend top3", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  
    // 공부량 top3
    axios
    .get(`/api/studyrooms/${studyroomId}/daily-study`, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((response) => {
      console.log("studyTime top3", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [studyroomId]);

  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <HeaderWrap>
          <HeaderTitle>
            {studyroom.name}
            <HeaderBtnWrap>
              <Link to="/StudyRoomAdmin" style={{ textDecoration: "none" }}>
                <IconButton aria-label="setting" size="large">
                  <SettingsIcon fontSize="inherit" />
                </IconButton>
              </Link>
            </HeaderBtnWrap>
          </HeaderTitle>
          <HeaderBtn>
            <div>
              <Button variant="contained" color="success" onClick={openModal}>
                스터디룸 탈퇴하기 
              </Button>
              <CustomModal isOpen={isModalOpen} closeModal={closeModal}>
                <Box>
                  <Typography variant="h6" component="h2">
                    삭제 시 더 이상 해당 스터디룸을 이용하지 못합니다.
                    <br />
                    정말 삭제하시겠습니까?
                  </Typography>
                  <Button onClick={() => closeModalEvent()}>확인</Button>
                  <Button onClick={() => setIsModalOpen(false)}>취소</Button>
                </Box>
              </CustomModal>
              <Snackbar
                open={isSnackBarOpen}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                message="정상적으로 탈퇴되었습니다."
              />
            </div>
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
              <StudyRoomMemberIcon studyroomId ="1"/>
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
              <StudyRoomMemberTime studyAvgTime = {studyAvgTime} maxAvgTime = {maxRestTime}/>
            </StudyRoomTimeWrap>
            <StudyRoomBoardWrap>
              <StudyRoomMemberBoard notice = {studyroom.notice}/>
            </StudyRoomBoardWrap>
          </ContentRightWrap>
        </ContentWrap>
      </ContainerWrap>
      <GFooter/>
    </div>
  );
};

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
const HeaderWrap = styled.div`
  display: flex;
  width: 80%;
  height: 10%;
`;
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
`;
const HeaderBtnWrap = styled.span`
  display: flex;
`;
const HeaderBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 100%;
  gap: 1vw;
`;
const ContentWrap = styled.div`
  display: flex;
  width: 80%;
  height: 90%;
  margin-top: 2vw;
`;
const ContentLeftWrap = styled.div`
  width: 70%;
  height: 100%;
`;
const StudyMemberWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
  gap: 1vw;
`;
const StudyScoreWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40%;
`;
const StudyChatWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40%;
`;
const ContentRightWrap = styled.div`
  width: 30%;
  height: 100%;
`;
const StudyRoomTimeWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 35%;
`;
const StudyRoomBoardWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 65%;
`;
export default StudyRoomMember;
