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

const StudyRoomMember = () => {
  const { studyroomId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studyroom, setStudyroom] = useState([]);
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

  // useEffect(() => {
  //   axios
  //     .get("/api/studyrooms/list", {
  //       headers: {
  //         Authorization: accessToken,
  //       },
  //     })
  //     .then((response) => {
  //       setStudyroom(response.data); // API 호출 완료 후에 studyrooms 업데이트
  //     })
  //     .catch((error) => {
  //       // 오류 처리
  //       console.log(error);
  //     });
  // }, []);

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
              <StudyRoomMemberTime />
            </StudyRoomTimeWrap>
            <StudyRoomBoardWrap>
              <StudyRoomMemberBoard />
            </StudyRoomBoardWrap>
          </ContentRightWrap>
        </ContentWrap>
      </ContainerWrap>
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
