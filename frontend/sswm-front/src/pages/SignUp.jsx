import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Gnb from "../components/Gnb";

import KakaoLogo from "../assets/Kakao_Logo.svg";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// 로그인
import GoogleSignIn from "../shared/GoogleSignIn";
import { GoogleOAuthProvider } from "@react-oauth/google";

const SignUp = () => {
  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <Box component="span" sx={{ p: 2, border: "1px solid grey" }}>
          <SignUpWrap>
            <Text> 회원가입 </Text>
            <SocialWrap>
              {/* <Link to="/SignUpName"> */}
                <GoogleOAuthProvider clientId="508793857526-hjnar37f3fdnjsopr7lv7dfgkf972p5h.apps.googleusercontent.com">
                  <GoogleSignIn />
                </GoogleOAuthProvider>
              {/* </Link> */}
              <LogoImg src={KakaoLogo} />
            </SocialWrap>
            <ButtonWrap>
              <Link to="/Login">
                <Button variant="outlined">로그인</Button>
              </Link>
            </ButtonWrap>
          </SignUpWrap>
        </Box>
      </ContainerWrap>
    </div>
  );
};

const ContainerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const SignUpWrap = styled.div`
  position: relative;
  width: 480px;
  height: 300px;
  background-color: #ffffff;
`;
const SocialWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const LogoImg = styled.img`
  width: 240px;
  height: 100px;
`;

const Text = styled.p`
  font-family: "NanumSquareNeo";
  font-size: 32px;
  text-align: center;
`;
const ButtonWrap = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

export default SignUp;
