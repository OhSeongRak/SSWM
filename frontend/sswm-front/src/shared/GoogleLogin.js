import styled from "styled-components";

import React from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { useGoogleLogin } from "@react-oauth/google";

import GoogleLogo from "../assets/btn_google_signin_light_normal_web@2x.png";

const GoogleLogin = () => {
  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);

      await Axios.post(
        // `/api/auth/google/login`,
        `/api/auth/google/login`,
        JSON.stringify(codeResponse),
        config
      )
        .then((jwtToken) => {
          console.log(2, jwtToken.data);
          // 데이터를 저장할 때는 JSON.stringify()를 사용하여
          // JavaScript 객체를 JSON 형식의 문자열로 변환하여 저장해야 합니다.
          localStorage.setItem(
            "accessToken",
            JSON.stringify(jwtToken.data.accessToken)
          );
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(jwtToken.data.refreshToken)
          );
          console.log(JSON.parse(localStorage.getItem("accessToken")));
          console.log(JSON.parse(localStorage.getItem("refreshToken")));
          // navigate("/StudyRoom");
          window.location.replace("/StudyRoom");
        })
        .catch((error) => {
          alert("회원정보가 존재 하지 않습니다.");
          navigate("/Login");
        });
    },
    flow: "auth-code",
  });

  return (
    <LogoImg
      src={GoogleLogo}
      alt="Google 로그인"
      style={{ cursor: "pointer" }}
      onClick={() => login()}
    />
  );
};

export default GoogleLogin;

const LogoImg = styled.img`
width: 300px;
height: 65px;
`;
