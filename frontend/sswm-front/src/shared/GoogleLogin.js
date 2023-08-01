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
        "https://i9a206.p.ssafy.io/api/auth/google",
        JSON.stringify(codeResponse),
        config
      );

      if (jwtToken.status === 200) {
        console.log(2, jwtToken.data);
        localStorage.setItem("jwtToken", jwtToken.data);
      }
    },
    flow: "auth-code",
  });

  return <button onClick={() => login()}>Sign in with Google 🚀 </button>;

};

export default GoogleLogin;