// // useToken.js
// import { useEffect, useState } from "react";
// import axios from "axios";

// const useToken = () => {
//   const [isTokenValid, setIsTokenValid] = useState(false);

//   useEffect(() => {
//     const checkTokenValidity = async () => {
//       const accessToken = JSON.parse(localStorage.getItem("accessToken"));
//       const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

//       if (accessToken == null) {
//         setIsTokenValid(false);
//         return;
//       }

//       try {
//         const response = await axios.post("`{REACT_APP_BASE_URL}/api/auth/access-token", accessToken, {
//           headers: {
//             Authorization: accessToken,
//           },
//         });

//         console.log("Access 토큰 유효: ", response.data);
//         setIsTokenValid(true);
//       } catch (error) {
//         console.error("Access 토큰 만료: ", error);
//         try {
//           const response = await axios.post("`{REACT_APP_BASE_URL}/api/auth/refresh-access-token", refreshToken, {
//             headers: {
//               Authorization: refreshToken,
//             },
//           });

//           console.log("refresh토큰을 이용해 토큰 재발급: ", response.data);
//           localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
//           localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken));
//           setIsTokenValid(true);
//         } catch (error) {
//           console.error("refresh 토큰 만료 :", error);
//           localStorage.removeItem("accessToken");
//           localStorage.removeItem("refreshToken");
//           setIsTokenValid(false);
//         }
//       }
//     };

//     checkTokenValidity();
//   }, []);

//   return isTokenValid;
// };

// export default useToken;
