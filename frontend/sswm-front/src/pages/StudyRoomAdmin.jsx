import React, { useState } from "react";
import styled from "styled-components";
import Gnb from "../components/Gnb";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import GroupsIcon from "@mui/icons-material/Groups";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Paper from "@mui/material/Paper";
import ForestIcon from "@mui/icons-material/Forest";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { styled as muistyled } from "@mui/material/styles";

import def from "../assets/dolphin.jpg";
import CustomModal from "../components/StudyRoom/deleteModal";
import { Box, Typography } from "@mui/material";

const Item = muistyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StudyRoomAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <HeaderWrap>
          <HeaderBtnWrap>
            <HeaderBtn>
              <HeaderBtnText placeholder="스터디 이름" />
              <CustomButton>중복확인</CustomButton>
            </HeaderBtn>
            <HeaderBtn>
              <HeaderBtnText placeholder="입장 코드 " />
              <CustomButton>저장</CustomButton>
            </HeaderBtn>
          </HeaderBtnWrap>
        </HeaderWrap>

        <ContentWrap>
          <ContentTop>
            <ContentTopLeftWrap>
              <StudyRoomImg src={def} />
            </ContentTopLeftWrap>
            <ContentTopRightWrap>
              <StudyRoomWrap>
                <StudyRoomTitle>
                  <LockIcon fontSize="large" />
                  공개 여부
                </StudyRoomTitle>
                <StudyRoomContent>
                  <FormControlLabel control={<Checkbox />} label="공개" />
                  <FormControlLabel control={<Checkbox />} label="비공개" />
                </StudyRoomContent>
              </StudyRoomWrap>
              <StudyRoomWrap>
                <StudyRoomTitle2>
                  <GroupsIcon fontSize="large" />
                  최대 인원
                </StudyRoomTitle2>
                <StudyRoomContent>
                  <IconButton aria-label="minus">
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <Item>00</Item>
                  <IconButton aria-label="plus">
                    <AddCircleOutlineIcon />
                  </IconButton>
                </StudyRoomContent>
              </StudyRoomWrap>
              <StudyRoomWrap>
                <StudyRoomTitle2>
                  <ForestIcon fontSize="large" />
                  일일 최대 휴식 시간
                </StudyRoomTitle2>
                <StudyRoomContent>
                  <IconButton aria-label="minus">
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <Item>00</Item>
                  <IconButton aria-label="plus">
                    <AddCircleOutlineIcon />
                  </IconButton>
                </StudyRoomContent>
              </StudyRoomWrap>
              <StudyRoomWrap>
                <StudyRoomTitle2>
                  <LocalOfferIcon fontSize="large" />
                  태그
                </StudyRoomTitle2>
                <StudyRoomContent>
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-normal"
                    defaultValue=""
                    variant="filled"
                    size="small"
                  />
                </StudyRoomContent>
              </StudyRoomWrap>
            </ContentTopRightWrap>
          </ContentTop>
          <ContentBottom>
            <ContentBottomLeft>
              <ContentBottomTitle>공지사항 관리</ContentBottomTitle>
              <ContentBottomBoard></ContentBottomBoard>
              <ContentBottomBtn></ContentBottomBtn>
            </ContentBottomLeft>
            <ContentBottomRight>
              <ContentBottomTitle>스터디원 관리</ContentBottomTitle>
              <ContentBottomBoard></ContentBottomBoard>
            </ContentBottomRight>
          </ContentBottom>
        </ContentWrap>

        <FooterWrap>
          <FooterBtnWrap>
            <Button variant="contained" color="success">
              수정
            </Button>
            <div>
              <Button variant="contained" color="error" onClick={openModal}>
                스터디룸 삭제
              </Button>
              <CustomModal isOpen={isModalOpen} closeModal={closeModal}>
                <Box>
                  <Typography variant="h6" component="h2">
                    삭제 시 더 이상 해당 스터디룸이 삭제되며 복구할 수 없습니다.
                    <br />
                    정말 삭제하시겠습니까?
                  </Typography>
                  <Button onClick={() => setIsModalOpen(false)}>확인</Button>
                  <Button onClick={() => setIsModalOpen(false)}>취소</Button>
                </Box>
              </CustomModal>
            </div>
          </FooterBtnWrap>
        </FooterWrap>
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
const HeaderBtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const HeaderBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;
`;
const HeaderBtnText = styled.input`
  max-width: 190px;
  padding: 10px;
  font-size: 15px;
  color: black;
  border-top-left-radius: 0.5em;
  border-bottom-left-radius: 0.5em;
  border: 2px solid #fff;
  margin-right: -10px;
  border: 1px solid black;
`;
const CustomButton = styled.button`
  border: none;
  background-color: #5b8d27;
  text-decoration: none;
  padding: 10px;
  font-size: 15px;
  color: #fff;
  border-top-right-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
  cursor: pointer;
`;

const ContentWrap = styled.div`
  width: 80%;
  height: 80%;
`;
const ContentTop = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  border: 1px solid black;
`;
const ContentTopLeftWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35%;
  height: 100%;
`;
const StudyRoomImg = styled.img`
  width: 90%;
  height: 90%;
`;
const ContentTopRightWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 65%;
  height: 100%;
`;
const StudyRoomWrap = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
`;
const StudyRoomTitle = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  font-size: 20px;
  font-family: "NanumSquareNeo";
  gap: 1vw;
  margin-left: 5vw;
`;
const StudyRoomContent = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
`;
const StudyRoomTitle2 = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  font-size: 20px;
  font-family: "NanumSquareNeo";
  gap: 1vw;
  margin-left: 5vw;
`;

const ContentBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
  border: 1px solid black;
  gap: 2vw;
`;
const ContentBottomLeft = styled.div`
  width: 46.5%;
  height: 90%;
  border: 3px solid #b2dfdb;
  border-radius: 15px;
  overflow: hidden;
`;
const ContentBottomRight = styled.div`
  width: 46.5%;
  height: 90%;
  border: 3px solid #b2dfdb;
  border-radius: 15px;
  overflow: hidden;
`;
const ContentBottomTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 15%;
  color: white;
  background-color: #b2dfdb;
  padding-left: 2vw;
  font-size: 20px;
  font-family: "NanumSquareNeo";
`;
const ContentBottomBoard = styled.div`
  width: 100%;
  height: 70%;
`;
const ContentBottomBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 15%;
  margin-right: 2vw;
`;

const FooterWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 10%;
`;
const FooterBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 50%;
  gap: 1vw;
`;
export default StudyRoomAdmin;
