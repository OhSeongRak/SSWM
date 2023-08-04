import styled from "styled-components";

import React from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { useGoogleLogin } from "@react-oauth/google";

import GoogleLogo from "../assets/Google_Logo.svg";

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
        // "https://i9a206.p.ssafy.io/api/auth/google/login",
        "http://localhost:8080/api/auth/google/login",
        JSON.stringify(codeResponse),
        config
      )
        .then((jwtToken) => {
          console.log(2, jwtToken.data);
          // 데이터를 저장할 때는 JSON.stringify()를 사용하여
          // JavaScript 객체를 JSON 형식의 문자열로 변환하여 저장해야 합니다.
          localStorage.setItem("jwtToken", JSON.stringify(jwtToken.data));
          navigate("/");
        })
        .catch((error) => {
          alert("회원정보가 존재 하지 않습니다.");
          navigate("/Login");
        });
    },
    flow: "auth-code",
  });

  return  <LogoImg src={GoogleLogo} alt="Google 로그인" style={{ cursor: "pointer" }} onClick={() => login()}/>;
};

export default GoogleLogin;

const LogoImg = styled.img`
  width: 240px;
  height: 100px;
`
