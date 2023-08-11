import React, { useState, useEffect } from "react";
import axios from "axios";

import styled from "styled-components";
import Gnb from "../components/Gnb";
import { Link } from "react-router-dom";

import StudyRoomMembers from "../components/StudyRoom/StudyRoomMembers";
import StudyRoomMemberScore from "../components/StudyRoom/StudyRoomMemberScore";
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
import GFooter from "../components/GFooter";

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
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

  const handleenterAdmin = () => {
    window.location.href = `/StudyroomAdmin/${studyroomId}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // dailylog 생성
        await axios.post(`/api/user-logs/${studyroomId}`, {}, {
          headers: {
            Authorization: accessToken,
          },
        });
        console.log("create daily log!!!!!!!!!!!!");

        // 스터디룸 조회
        const studyroomResponse = await axios.get(`/api/studyrooms/${studyroomId}`, {
          headers: {
            Authorization: accessToken,
          },
        });
        console.log("studyroomResponse:", studyroomResponse);
        setStudyroom(studyroomResponse.data);
        setStudyAvgTime(formatTime(studyroomResponse.data.studyAvgTime));
        setMaxRestTime(formatTime(studyroomResponse.data.maxRestTime));

        } catch (error) {
          console.log(error);
          console.log("dailylog 에러", error);
        }

    };    
    fetchData();
  }, [studyroomId, accessToken]);

  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <HeaderWrap>
          <HeaderTitle>
            <Background>
              {studyroom.name}
            </Background>
            <HeaderBtnWrap>
              <Link to="/StudyRoomAdmin" style={{ textDecoration: "none" }}>
                <IconButton onClick={handleenterAdmin} aria-label="setting" size="large">
                  <SettingsIcon fontSize="inherit" />
                </IconButton>
              </Link>
            </HeaderBtnWrap>
          </HeaderTitle>
        </HeaderWrap>
        <ContentWrap>
            {/* 스터디원 */}
            <StudyMemberWrap>
              <StudyRoomMembers studyroomId={studyroomId} />
            </StudyMemberWrap>
            
            <div style={{display:"flex",justifyContent:"space-between"}}>
              {/* 공지사항 */}
              <StudyRoomBoardWrap>
                <StudyRoomMemberBoard notice={studyroom.notice} />
              </StudyRoomBoardWrap>

              {/* 공부,휴식 시간 */}
              <SideBanner>
                <Link to={`/LiveRoom/${studyroomId}`} style={{ textDecoration: "none" }}>
                  <Button variant="contained" 
                    sx={{
                      m : 1,
                      backgroundColor: "#114B0B",
                      ":hover": { backgroundColor: "#FA990E" },
                    }}
                  >
                    라이브 입장
                  </Button>
                </Link>
                <StudyRoomTimeWrap>
                  <StudyRoomMemberTime studyAvgTime={studyAvgTime} maxAvgTime={maxRestTime} />
                </StudyRoomTimeWrap>
              </SideBanner>
            </div>
       
        </ContentWrap>
        <ContentWrap>
          <StudyScoreWrap>
              {/*일일 공부왕, 7월 출석왕*/}
              <StudyRoomMemberScore studyroomId={studyroomId} />
          </StudyScoreWrap>
        </ContentWrap>
        <ContentWrap>
               {/* 스터디룸 탈퇴하기 */}
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
        </ContentWrap>
      </ContainerWrap>
      <GFooter />
    </div>
  );
};
const Background = styled.span`
  padding: 7px;
  border-radius : 10px;
`;
const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 120vh;
`;
const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10vh;
  margin-top: 5vw;
`;
const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  border-radius: 15px;
  font-size: 30px;
  font-family: "NanumSquareNeo";
  
`;
const HeaderBtnWrap = styled.span`
  display: flex;
`;

const ContentWrap = styled.div`
  display: flex;
  width: 80%;
  height: 60vh;
  margin-top: 2vw;
  flex-direction: column;
`;

const StudyMemberWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20vh;
  gap: 1vw;
`;
const StudyScoreWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40vh;
`;


const StudyRoomTimeWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  
`;
const StudyRoomBoardWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40vh;
`;
const SideBanner = styled.div`
  position: fixed;
  right: 0;
  top: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 0.2rem solid #FA990E;
  border-radius : 15px;
  padding: 0.5rem;
  margin: 0 0.2rem 0 0;
  background: white;
`
export default StudyRoomMember;
