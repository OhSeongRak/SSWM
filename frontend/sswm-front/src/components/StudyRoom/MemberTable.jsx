import React, { useState } from "react";
import styled from "styled-components";

import CustomModal from "./deleteModal";
import { Box, Typography, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router";

const MemberTable = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openHostModal = () => setIsHostModalOpen(true);
  const closeHostModal = () => setIsHostModalOpen(false);

  // Snackbar
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [isSnackBarOpenHost, setIsHostSnackBarOpen] = useState(false);

  const openSnackBar = () => setIsSnackBarOpen(true);
  const closeSnackBar = () => setIsSnackBarOpen(false);

  const openHostSnackBar = () => setIsHostSnackBarOpen(true);
  const closeHostSnackBar = () => setIsHostSnackBarOpen(false);

  const { studyroomId } = useParams();
  const [studyroomDto, setStudyroomDto] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const navigate = useNavigate();

  const closeModalEvent = () => {
    setIsModalOpen(false);

    axios
      .put(`/api/studyrooms/${studyroomId}/ban`, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("스터디방이 수정되었습니다.");
        Navigate(`/StudyRoomMember/${studyroomId}`);
      })
      .catch((error) => {
        // 오류 처리
        console.log(Error);
        alert("스터디방이 수정되지 않았습니다.");
      });

    openSnackBar(); // Open the CustomSnackBar after closing the modal
  };

  const closeHostModalEvent = () => {
    setIsHostModalOpen(false);

    axios
      .put(`/api/studyrooms/${studyroomId}/pass`, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("스터디방이 수정되었습니다.");
        navigate(`/StudyRoomMember/${studyroomId}`);
      })
      .catch((error) => {
        // 오류 처리
        console.log(Error);
        alert("스터디방이 수정되지 않았습니다.");
      });

    openHostSnackBar(); // Open the CustomSnackBar after closing the modal
  };

  return (
    <ContainerWrap>
      <TableWrap>
        <TbodyWrap>
          <TrWrap>
            <TdWrap>스터디원1</TdWrap>
            <TdWrap>방장</TdWrap>
            <TdWrap>
              <ButtonWrap onClick={openHostModal}>권한</ButtonWrap>
              <CustomModal isOpen={isHostModalOpen} closeModal={closeHostModal}>
                <Box>
                  <Typography variant="h6" component="h2">
                    방장의 권한을 해당 유저에게 위임하겠습니까?
                  </Typography>
                  <Button onClick={() => closeHostModalEvent()}>확인</Button>
                  <Button onClick={() => setIsHostModalOpen(false)}>취소</Button>
                </Box>
              </CustomModal>
              <Snackbar
                open={isSnackBarOpenHost}
                autoHideDuration={3000}
                onClose={closeHostSnackBar}
                message="방장이 변경되었습니다"
              />
              <ButtonWrap onClick={openModal}>차단</ButtonWrap>
              <CustomModal isOpen={isModalOpen} closeModal={closeModal}>
                <Box>
                  <Typography variant="h6" component="h2">
                    차단 시 해당 유저가 더 이상 해당 스터디룸을 이용하지 못합니다.
                    <br />
                    정말 차단하시겠습니까?
                  </Typography>
                  <Button onClick={() => closeModalEvent()}>확인</Button>
                  <Button onClick={() => setIsModalOpen(false)}>취소</Button>
                </Box>
              </CustomModal>
              <Snackbar
                open={isSnackBarOpen}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                message="정상적으로 차단되었습니다."
              />
            </TdWrap>
          </TrWrap>
        </TbodyWrap>
      </TableWrap>
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-y: scroll;
`;
const TableWrap = styled.table`
  width: 100%;
  height: 100%;
  text-align: center;
  border: 1px solid #fff;
  border-spacing: 1px;
  font-family: "NanumSquareNeo";
  margin: auto;
`;
const TbodyWrap = styled.tbody``;
const TrWrap = styled.tr``;
const TdWrap = styled.td`
  padding: 10px;
  background-color: #eee;
`;
const ButtonWrap = styled.button`
  font-family: "NanumSquareNeo";
  margin-right: 10px;
`;

export default MemberTable;
