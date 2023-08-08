// // const [isTokenValid, setIsTokenValid] = useState(false);

// const initialState = {
//     isTokenValid: false,
//   };

// const checkToken = (state =initialState, action) => {
    
//     switch (action.type){
//         case "CHECK_TOKEN":
//             return{
            
//             const token = localStorage.getItem("jwtToken");
//             if(token === null){
//                 isTokenValid=false;
//                 return;
//             }
//         }

//   }
//   // 로그인 안했을 때
//   if (token === null) {
//     isTokenValid=false;
//     return;
//   }

//   axios
//     .post("http://localhosy:8080/api/auth/access-token", token.accessToken, {
//       headers: {
//         Authorization: token.accessToken,
//       },
//     })
//     .then((response) => {
//       console.log("Access 토큰 유효: ", response.data);
//       setIsTokenValid(true);
//     })
//     .catch((error) => {
//       // 로그인 했지만 access 토큰 만료 재발급 필요
//       console.error("Access 토큰 만료: ", error);
//       axios
//       .post("http://localhosy:8080/api/auth/refresh-access-token", token.refreshToken, {
//         headers: {
//           Authorization: token.refreshToken,
//         },
//       })
//       .then((response) => {
//         console.log("refresh토큰을 이용해 토큰 재발급: ", response.data);
//         localStorage.setItem("jwtToken", JSON.stringify(response.data));
//         setIsTokenValid(true);
//       })
//       .catch((error) => {
//         console.error("refresh토큰을 이용해 토큰 만료:", error);
//         setIsTokenValid(false);
//         localStorage.setItem("jwtToken", null);
//       });
//     });
// };