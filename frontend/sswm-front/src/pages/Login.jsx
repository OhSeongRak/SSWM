import styled from "styled-components";
import { Link } from "react-router-dom";

import Gnb from "../components/Gnb";

import Box from "@mui/material/Box";

// 로그인
import GoogleLogin from "../shared/GoogleLogin";
import KakaoLogin from "../shared/KakaoLogin";

import { GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <Box
          component="span"
          sx={{
            p: 2,
            border: "1px solid #5B8D27",
            borderRadius: "30px",
          }}
        >
          <LoginWrap>
            <Text> 간편로그인 </Text>
            <SocialWrap>
              <GoogleOAuthProvider clientId="508793857526-hjnar37f3fdnjsopr7lv7dfgkf972p5h.apps.googleusercontent.com">
                <GoogleLogin />
              </GoogleOAuthProvider>
              <KakaoLogin
                REST_API_KEY="a8cdfb7c6e1ce33857c1ff4df66c348c"
                //  REDIRECT_URI={`${process.env.REACT_APP_REDIRECT_URI}/kakao/login`}
                REDIRECT_URI="http://localhost:3000/kakao/login"
              />
            </SocialWrap>
            <ButtonWrap>
              아직 회원이 아니신가요?
              <Link to="/SignUp" style={{ textDecoration: "none" }}>
                <div style={{ color: "#87C159" }}>회원가입 하러 가기</div>
              </Link>
            </ButtonWrap>
          </LoginWrap>
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
const LoginWrap = styled.div`
  position: relative;
  width: 480px;
  height: 300px;
`;
const SocialWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
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

export default Login;
