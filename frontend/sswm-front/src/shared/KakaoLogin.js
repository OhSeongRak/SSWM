
import styled from "styled-components";
import KakaoLogo from "../assets/kakao_login_large_narrow.png";

const KakaoLogin = ({REST_API_KEY, REDIRECT_URI}) => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

  const login = () =>{
    window.location.href=(`${kakaoURL}`);
    console.log("Login")
  };
  

  return(
    <LogoImg
    src={KakaoLogo}
    alt="Kakao 로그인"
    style={{ cursor: "pointer" }}
    onClick={() => login()}
  />
  )
}

export default KakaoLogin;

const LogoImg = styled.img`
width: 300px;
height: 65px;
`;