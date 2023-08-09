import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';

import Logo from '../assets/Logo.png'


const Gnb = (props) => {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const navigate = useNavigate();
  const handleLogout = () => {
  
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/Login");
  };

  return (
    <Header>
      <Link to="/StudyRoom" style={{ textDecoration: "none" }}>
        <LogoImg src={Logo} alt="Logo" />
      </Link>
      <GnbBtn>
        {isLoggedIn ? (
          <>
            <Link to="/MyPage" style={{ textDecoration: "none", color:"black" }}>
              <GnbBtn>마이페이지</GnbBtn>
            </Link>
            <GnbBtn onClick={handleLogout} style={{ cursor: "pointer" }}>로그아웃</GnbBtn>
          </>
        ) : (
          <Link to="/Login" style={{ textDecoration: "none", color:"black" }}>
            <GnbBtn>로그인</GnbBtn>
          </Link>
        )}
      </GnbBtn>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  justify-content : space-between;
`

const LogoImg = styled.img`
  width: 100px;
  height: 50px;
`

const GnbBtn = styled.div`
  display: inline-flex;
  font-family: "NanumSquareNeo";
  font-size: 20px;
  margin-left: 15px;  
`

export default Gnb;