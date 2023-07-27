import React from "react";
import styled from "styled-components";
import Gnb from "../components/Gnb";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


import def from '../assets/dolphin.jpg';

const SignUpName = () => {
  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <AddImgWrap>
          <Avatar
            alt="Default Img"
            src={def}
            sx={{ width: 300, height: 300 }}
          />
        </AddImgWrap>

        <NameWrap>
          <TextField
            helperText="Please enter your name"
            id="demo-helper-text-aligned"
            label="Name"
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
`
const AddImgWrap = styled.div`
  background-color: #green;
`

const NameWrap = styled.div`
  margin-top: 10px;
  display: inline-flex;
`

const ButtonWrap = styled.div`
  margin-top: 10px;
`

export default SignUpName;