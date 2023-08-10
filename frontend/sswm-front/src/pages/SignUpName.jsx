import React, { useRef, useState } from "react";
import styled from "styled-components";
import Gnb from "../components/Gnb";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import def from "../assets/dolphin.jpg";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import GFooter from "../components/GFooter";

let formData = new FormData();
const SignUpName = () => {
  const [nickName, setNickName] = useState("");

  const [checkedNickName, setCheckedNickName] = useState("");

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const navigate = useNavigate();

  const [isExist, setIsExist] = useState(true);

  const [imageSrc, setImage] = useState(def);

  const imageUp = useRef();

  const onClickImage = () => {
    imageUp.current.click();
  };

  // 이미지 파일 변경
  const handleFileChange = (fileUp) => {
    const file = fileUp.target.files[0];

    if (file) {
      // 일단 formData를 초기화함으로써 파일이 여러개 추가되지않는다.
      formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", file.type);

      setImage(URL.createObjectURL(file));

      // formData를 보고싶으면 keys와 values 값을 봐야한다.
      for (const key of formData.keys()) {
        console.log(key);
      }
      for (const value of formData.values()) {
        console.log(value);
      }
    }
  };

  // 이름 변경
  const handleNameChange = (event) => {
    setNickName(event.target.value);
    console.log("닉네임 : " + nickName);
  };

  // 닉네임 중복 확인 함수
  const checkNickName = () => {
    console.log("닉네임 : " + nickName);

    setCheckedNickName(nickName);

    axios
      .get("/api/users/exists", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          nickname: nickName,
        },
      })
      .then((response) => {
        setIsExist(response.data);
        console.log(response.data);
        // isExist 값에 따라 중복 확인 로직을 수행
        if (response.data) {
          alert("중복된 닉네임입니다.");
        } else {
          alert("사용 가능한 닉네임입니다.");
        }
        console.log("중복 확인" + response.data);
        return response.data;
      })
      .catch((error) => {
        // 오류 처리
        console.log(error);
        alert("닉네임 확인 중 오류가 발생했습니다.");
        return true;
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("isExist : " + isExist);
    console.log("nickName :" + nickName);
    console.log("checkedNickName :" + checkedNickName);
    // 닉네임 중복확인
    if (isExist || nickName !== checkedNickName) {
      alert("닉네임 중복 확인이 필요합니다.");
      return;
    }

    formData.append("nickname", nickName);

    // Axios 또는 Fetch API를 사용하여 formData를 서버로 전송
    // 예시로 Axios 사용
    axios
      .put("/api/users", formData, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        // navigate("/StudyRoom");
        window.location.replace("/StudyRoom");
      })
      .catch((error) => {
        // 오류 처리
        alert("적용되지 않았습니다.");
        console.log(Error);
      });
  };

  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <AddImgWrap>
          <input
            type="file"
            ref={imageUp}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {imageSrc && (
            <Avatar
              onClick={onClickImage}
              alt="Default Img"
              src={imageSrc}
              sx={{ width: 300, height: 300 }}
            ></Avatar>
          )}
        </AddImgWrap>

        <NameWrap>
          <TextField
            helperText="사용하실 닉네임을 입력해 주세요."
            id="demo-helper-text-aligned"
            label="Nickname"
            onChange={handleNameChange}
          />
          <Button
            sx={{ width: "100px", marginLeft: "10px", height: 52 }}
            variant="contained"
            color="success"
            onClick={checkNickName}
          >
            중복확인
          </Button>
        </NameWrap>

        <ButtonWrap>
          <Button variant="outlined" onClick={handleSubmit}>
            시작하기
          </Button>
        </ButtonWrap>
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
const AddImgWrap = styled.div`
  background-color: #green;
`;

const NameWrap = styled.div`
  margin-top: 10px;
  display: inline-flex;
`;

const ButtonWrap = styled.div`
  margin-top: 10px;
`;

export default SignUpName;
