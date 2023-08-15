import React, { useEffect, useState } from "react";
import styled from "styled-components";

import CustomModal from "./deleteModal";
import { Box, Typography, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router";

const MemberTable = ({ studyroomId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [modalStates, setModalStates] = useState({});

  const openModal = (person) => {
    setModalStates(person.userDto);
    setIsModalOpen(true);
  }
  const closeModal = () => setIsModalOpen(false);

  const openHostModal = (person) => {
    setModalStates(person.userDto);
    setIsHostModalOpen(true);
  }
  const closeHostModal = () => setIsHostModalOpen(false);

  // Snackbar
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [isSnackBarOpenHost, setIsHostSnackBarOpen] = useState(false);

  const openSnackBar = () => setIsSnackBarOpen(true);
  const closeSnackBar = () => setIsSnackBarOpen(false);

  const openHostSnackBar = () => setIsHostSnackBarOpen(true);
  const closeHostSnackBar = () => setIsHostSnackBarOpen(false);

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const [studyPeople, setStudyPeople] = useState();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`/api/studyrooms/${studyroomId}/search-user`, {
          headers: {
            Authorization: accessToken,
          },
        });
        console.log("스터디원 목록:::", response.data);
        setStudyPeople(response.data);
      } catch (error) {
        console.error("유저 데이터를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchMembers(); // 함수 실행
    // eslint-disable-next-line
  }, [studyroomId]);

  const navigate = useNavigate();

  const closeModalEvent = (userDto) => {
    setIsModalOpen(false);

    axios
      .put(`/api/studyrooms/${studyroomId}/ban`, userDto, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        openSnackBar();
        window.location.reload();
        // Navigate(`/StudyRoomMember/${studyroomId}`);
      })
      .catch((error) => {
        // 오류 처리
        console.log(error);
        alert("해당유저를 스터디룸에서 차단하는것에 실패했습니다");
      });
  };

  const closeHostModalEvent = (userDto) => {
    setIsHostModalOpen(false);
    console.log("userDto",userDto);
    axios
      .put(`/api/studyrooms/${studyroomId}/pass`, userDto, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log("권한 ERROR:::", response.data);
        openHostSnackBar(); // Open the CustomSnackBar after closing the modal
        navigate(`/StudyRoomMember/${studyroomId}`);
      })
      .catch((error) => {
        // 오류 처리
        console.log(Error);
        alert("방장변경에 실패했습니다");
      });
  };

  return (
    <ContainerWrap>
      {studyPeople &&
        studyPeople.map((person, idx) => {
          if (person.role !== 'HOST') {
            return (
            <TableWrap key={idx}>
              <TbodyWrap>
                <TrWrap>
                  <TdWrap>{person.userDto.nickname}</TdWrap>
                  <TdWrap>{person.role}</TdWrap>
                  <TdWrap>
                    <ButtonWrap onClick={() => openHostModal(person)}>권한</ButtonWrap>
                    <CustomModal isOpen={isHostModalOpen} closeModal={closeHostModal}>
                      <Box>
                        <Typography variant="h6" component="h2">
                          방장의 권한을 해당 유저에게 위임하겠습니까?
                        </Typography>
                        <Button onClick={() => closeHostModalEvent(modalStates)}>확인</Button>
                        <Button onClick={() => setIsHostModalOpen(false)}>취소</Button>
                      </Box>
                    </CustomModal>
                    <Snackbar
                      open={isSnackBarOpenHost}
                      autoHideDuration={3000}
                      onClose={closeHostSnackBar}
                      message="방장이 변경되었습니다"
                    />
                    <ButtonWrap onClick={() => openModal(person)}>차단</ButtonWrap>
                    <CustomModal isOpen={isModalOpen} closeModal={closeModal}>
                      <Box>
                        <Typography variant="h6" component="h2">
                          차단 시 해당 유저가 더 이상 해당 스터디룸을 이용하지 못합니다.
                          <br />
                          정말 차단하시겠습니까?
                        </Typography>
                        <Button onClick={() => closeModalEvent(modalStates)}>확인</Button>
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
            );
          }
          return null;
        })}
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
  margin: auto;
`;
const TbodyWrap = styled.tbody``;
const TrWrap = styled.tr``;
const TdWrap = styled.td`
  padding: 10px;
  background-color: #eee;
`;
const ButtonWrap = styled.button`
  margin-right: 10px;
`;

export default MemberTable;
