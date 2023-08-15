import styled from "styled-components";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return(
    <ContainerWrap>
      <ContentWrap>
        <Link to="/" style={{ textDecoration: "none" }}>
          <LogoImg src={Logo} alt="Logo" />
        </Link>
        <TextWrap>
          404 NOT FOUND
        </TextWrap>
        <TextWrap2>
          로고를 클릭하시면 홈으로 이동합니다.
        </TextWrap2>
      </ContentWrap>
    </ContainerWrap>
  );
}

const ContainerWrap = styled.div`
  width: 100%;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrap = styled.div`
  width: 40%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 70px;
`
const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const TextWrap = styled.div`
`
const TextWrap2 = styled.div`
  font-size: 30px;
`

export default NotFound;