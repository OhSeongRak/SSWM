import React from "react";
import Axios from "axios";

import { useGoogleLogin } from "@react-oauth/google";

const GoogleLogin = () => {
  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);

      let jwtToken = await Axios.post(
        "https://i9a206.p.ssafy.io/api/auth/google/signin",
        // "http://localhost:8080/api/auth/google/signin",
        JSON.stringify(codeResponse),
        config
      );

      if (jwtToken.status === 200) {
        console.log(2, jwtToken.data);
         // 데이터를 저장할 때는 JSON.stringify()를 사용하여 
        // JavaScript 객체를 JSON 형식의 문자열로 변환하여 저장해야 합니다.
        localStorage.setItem("jwtToken", JSON.stringify(jwtToken.data));
      }
    },
    flow: "auth-code",
  });

  return <button onClick={() => login()}>Sign in with Google 🚀 </button>;

};

export default GoogleLogin;