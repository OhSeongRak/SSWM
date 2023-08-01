import React from "react";
import Axios from "axios";

import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);

      let jwtToken = await Axios.post(
        "https://i9a206.p.ssafy.io/api/oauth/jwt/google",
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

export default Login;

// const config = {
//   headers: {
//     "Content-Type": "application/json; charset=utf-8",
//   },
// };

// const responseGoogle = async (response) => {
//   console.log(1, response);
//   let jwtToken = await Axios.post(
//     "http://localhost:8080/oauth/jwt/google",
//     JSON.stringify(response),
//     config
//   );
//   if (jwtToken.status === 200) {
//     console.log(2, jwtToken.data);
//     localStorage.setItem("jwtToken", jwtToken.data);
//   }
// };

// const Login = () => {
//   return (
//     <GoogleLogin
//       clientId="클라이언트ID"
//       buttonText="Login"
//       onSuccess={responseGoogle}
//       onFailure={responseGoogle}
//       cookiePolicy={"single_host_origin"}
//     />
//   );
// };

// export default Login;
