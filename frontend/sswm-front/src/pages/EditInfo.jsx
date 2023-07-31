import React, { useRef, useState } from "react";
import styled from "styled-components";
import Gnb from "../components/Gnb";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import def from "../assets/fubao.jpg";
import CustomModal from "../components/StudyRoom/deleteModal";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const EditInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [imageSrc, setImage] = useState(def);

  const imageUp = useRef();

  const onClickImage = () => {
    imageUp.current.click();
  };

  const fileBase = (fileUp) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileUp);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      };
    });
  };

  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <EditWrap>
          <EditContentWrap>
            <EditContent>
              <EditLeftContent>프로필</EditLeftContent>
              <EditRightContent>
                <input
                  type="file"
                  ref={imageUp}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    fileBase(e.target.files[0]);
                  }}
                />
                {imageSrc && (
                  <Avatar
                    onClick={onClickImage}
                    alt="Default Img"
                    src={imageSrc}
                    sx={{ width: 60, height: 60 }}
                  ></Avatar>
                )}
              </EditRightContent>
            </EditContent>
            <EditContent>
              <EditLeftContent>닉네임</EditLeftContent>
              <EditRightContent>
                <TextField
                  hiddenLabel
                  id="filled-hidden-label-normal"
                  defaultValue="용인푸씨"
                  variant="filled"
                />
                <Button variant="outlined" color="error">
                  중복확인
                </Button>
              </EditRightContent>
            </EditContent>
            <EditContent>
              <EditLeftContent>이름</EditLeftContent>
              <EditRightContent>푸바오</EditRightContent>
            </EditContent>
            <EditContent>
              <EditLeftContent>이메일</EditLeftContent>
              <EditRightContent>fubao@everland.com</EditRightContent>
            </EditContent>
          </EditContentWrap>
        </EditWrap>

        <BtnWrap>
          <BtnLeftWrap>
            <div>
              <Button variant="contained" color="success" onClick={openModal}>
                회원 탈퇴하기
              </Button>
              <CustomModal isOpen={isModalOpen} closeModal={closeModal}>
                <Box>
                  <Typography variant="h6" component="h2">
                    탈퇴 시 서비스를 이용할 수 없습니다.
                    <br />
                    정말 삭제하시겠습니까?
                  </Typography>
                  <Button onClick={() => setIsModalOpen(false)}>확인</Button>
                  <Button onClick={() => setIsModalOpen(false)}>취소</Button>
                </Box>
              </CustomModal>
            </div>
          </BtnLeftWrap>
          <BtnRightWrap>
            <Link to="/MyPage" style={{ textDecoration: "none" }}>
              <ButtonCustom>저장</ButtonCustom>
            </Link>
            <Link to="/MyPage" style={{ textDecoration: "none" }}>
              <ButtonCustom>취소</ButtonCustom>
            </Link>
          </BtnRightWrap>
        </BtnWrap>
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
const EditWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 80%;
`;
const EditContentWrap = styled.div`
  width: 100%;
  height: 70%;
`;
const EditContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 25%;
`;
const EditLeftContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 100%;
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  font-size: 20px;
  font-family: "NanumSquareNeo";
`;
const EditRightContent = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 0px 0px 3vw;
  width: 85%;
  height: 100%;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  font-size: 20px;
  font-family: "NanumSquareNeo";
  gap: 2vw;
`;
const BtnWrap = styled.div`
  display: flex;
  height: 20%;
  width: 80%;
  justify-content: space-between;
`;
const BtnLeftWrap = styled.div``;
const BtnRightWrap = styled.div``;
const ButtonCustom = styled.button`
  background-color: #ffffff;
  border: 1px solid #fecc47;
  border-radius: 0.5rem;
  color: #111827;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
  padding: 0.45rem 1rem;
  text-align: center;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-select: none;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  margin-left: 1vw;
`;
export default EditInfo;
