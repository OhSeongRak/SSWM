import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Gnb from "../components/Gnb";

import Box from "@mui/material/Box";

// 회원가입
import GoogleSignIn from "../shared/GoogleSignIn";
import KakaoSignIn from "../shared/KakaoSign";
import { GoogleOAuthProvider } from "@react-oauth/google";
 
const SignUp = () => {
  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <Box component="span" sx={{  p: 2, border: "3px solid orange",borderRadius:"35px" }}>
          <SignUpWrap>
            <Text> 회원가입 </Text>
            <SocialWrap>
              <GoogleOAuthProvider clientId="508793857526-hjnar37f3fdnjsopr7lv7dfgkf972p5h.apps.googleusercontent.com">
                <GoogleSignIn />
              </GoogleOAuthProvider>
              <KakaoSignIn
                REST_API_KEY="a8cdfb7c6e1ce33857c1ff4df66c348c"
                // REDIRECT_URI="https://i9a206.p.ssafy.io"
                REDIRECT_URI="http://localhost:3000/kakao/sign"
              />
            </SocialWrap>
            <ButtonWrap>
              <Link to="/Login" style={{ textDecoration: "none"}}>
              <div style={{color:"orange"}} >로그인하러 가기</div>
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

const Text = styled.p`
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
