import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Gnb from "../components/Gnb";
import SearchBar from "../components/SearchBar";
import StudyRoomList from "../components/StudyRoom/StudyRoomList";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FadeMenu from "../components/SortMenu";
import CheckboxChip from "../components/StudyRoom/HashTags";

const StudyRoom = (props) => {
  const [isTokenValid, setIsTokenValid] = useState(false);

  const checkTokenValidity = () => {
    const token = JSON.parse(localStorage.getItem("jwtToken"));

    console.log(token);
    // 로그인 안했을 때
    if (token === null) {
      setIsTokenValid(false);
      return;
    }
    console.log(token.accessToken);

    axios
      .post("http://localhost:8080/api/auth/access-token", token.accessToken, {
        headers: {
          Authorization: token.accessToken,
        },
      })
      .then((response) => {
        console.log("Access 토큰 유효: ", response.data);
        setIsTokenValid(true);
      })
      .catch((error) => {
        // 로그인 했지만 access 토큰 만료 재발급 필요
        console.error("Access 토큰 만료: ", error);
        axios
          .post(
            "http://localhost:8080/api/auth/refresh-access-token",
            token.refreshToken,
            {
              headers: {
                Authorization: token.refreshToken,
              },
            }
          )
          .then((response) => {
            console.log("refresh토큰을 이용해 토큰 재발급: ", response.data);
            localStorage.setItem("jwtToken", JSON.stringify(response.data));
            setIsTokenValid(true);
          })
          .catch((error) => {
            console.error("refresh토큰을 이용해 토큰 만료:", error);
            setIsTokenValid(false);
            localStorage.setItem("jwtToken", null);
          });
      });
  };

  useEffect(() => {
    // 컴포넌트가 마운트된 후, 처음 한 번 유효성 확인
    checkTokenValidity();

    // 일정 간격(예: 1분)으로 토큰 유효성 확인
    const intervalId = setInterval(checkTokenValidity, 60000);

    // 언마운트 시 인터벌 클리어
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <SearchBar />
        <CheckChip>
          <CheckboxChip />
        </CheckChip>
        <StudyRoomBtn>
          <SortBtn>
            <FadeMenu></FadeMenu>
          </SortBtn>
          <FormGroup style={{ display: "inline-block" }}>
            <FormControlLabel
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontFamily: "NanumSquareNeo",
                },
              }}
              control={<Checkbox />}
              label="비공개 스터디룸 표시"
            />
            <FormControlLabel
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontFamily: "NanumSquareNeo",
                },
              }}
              control={<Checkbox />}
              label="꽉 찬 스터디룸 표시"
            />
          </FormGroup>
        </StudyRoomBtn>

        <StudyRoomList />
        <AddBtn>
          <Link to="/CreateStudyRoom">
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        </AddBtn>
      </ContainerWrap>
    </div>
  );
};

const ContainerWrap = styled.div`
  width: 100%;
  font-family: "NanumSquareNeo";
`;

const CheckChip = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  margin-top: 40px;
  margin-left: 10%;
  margin-right: 10%;
  font-family: "NanumSquareNeo";
`;

const StudyRoomBtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 80px;
  margin-top: 30px;
`;
const SortBtn = styled.div``;
const AddBtn = styled.div`
  position: fixed;
  bottom: 1vw;
  right: 1vw;
`;

export default StudyRoom;
