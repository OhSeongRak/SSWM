import React, { useRef, useState } from "react";
import styled from "styled-components";
import Gnb from "../components/Gnb";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import def from "../assets/dolphin.jpg";

const SignUpName = () => {
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
        <AddImgWrap>
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
              sx={{ width: 300, height: 300 }}
            ></Avatar>
          )}
        </AddImgWrap>

        <NameWrap>
          <TextField
            helperText="중복되는 닉네임입니다."
            id="demo-helper-text-aligned"
            label="Nickname"
          />
        </NameWrap>

        <ButtonWrap>
          <Button variant="outlined">시작하기</Button>
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
