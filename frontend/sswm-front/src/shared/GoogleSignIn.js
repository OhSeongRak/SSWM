import styled from "styled-components";

import React from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { useGoogleLogin } from "@react-oauth/google";

import GoogleLogo from "../assets/btn_google_signin_light_normal_web@2x.png";

const GoogleSignIn = () => {
  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  const navigate = useNavigate();

  const siginIn = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);

      await Axios.post(
        // `/api/auth/google/signin`,
        `/api/auth/google/signin`,
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
          navigate("/SignUpName");
        })
        .catch((error) => {
          // 오류 처리
          if (error.response.status === 400) {
            alert("이미 가입한 유저입니다.");
            // 400 에러가 발생하면 Login 페이지로 이동
            navigate("/Login");
          } else {
            alert("회원가입에 실패했습니다.");
            navigate("/SignUp");
          }
        });
    },
    flow: "auth-code",
  });

  return (
    <LogoImg
      src={GoogleLogo}
      alt="Google 회원가입"
      style={{ cursor: "pointer" }}
      onClick={() => siginIn()}
    />
  );
};

export default GoogleSignIn;

const LogoImg = styled.img`
width: 300px;
height: 65px;
`;
