import { React, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import Logo from "../assets/Logo.png";

let currentPath = "";
const Gnb = (props) => {
  let location = useLocation();
  useEffect(() => {
    if (currentPath === location.pathname) window.location.reload();

    currentPath = location.pathname;
  }, [location]);
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.replace("/Login");
  };

  return (
    <Header>
      <Link to="/StudyRoom" style={{ textDecoration: "none" }}>
        <LogoImg src={Logo} alt="Logo" />
      </Link>
      <GnbBtn>
        {isLoggedIn ? (
          <>
            <Link to="/MyPage" style={{ textDecoration: "none", color: "black" }}>
              <GnbBtn>마이페이지</GnbBtn>
            </Link>
            <GnbBtn onClick={handleLogout} style={{ cursor: "pointer" }}>
              로그아웃
            </GnbBtn>
          </>
        ) : (
          <Link to="/Login" style={{ textDecoration: "none", color: "black" }}>
            <GnbBtn>로그인</GnbBtn>
          </Link>
        )}
      </GnbBtn>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  margin: 40px 80px;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

const LogoImg = styled.img`
  width: auto;
  height: 60px;
`;

const GnbBtn = styled.div`
  display: inline-flex;
  font-size: 20px;
  margin-left: 15px;
  white-space: nowrap;
`;

export default Gnb;
