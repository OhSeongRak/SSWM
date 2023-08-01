import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

import Logo from '../assets/Logo.png'


const Gnb = (props) => {
  return (
    <Header>
      <Link to="/" style={{ textDecoration: "none" }}><LogoImg src={Logo}/></Link>
      <GnbBtn>
        <Link to="/MyPage" style={{ textDecoration: "none" }}><GnbBtn>마이페이지</GnbBtn></Link>
        <Link to="/Login" style={{ textDecoration: "none" }}><GnbBtn>로그인</GnbBtn></Link>
      </GnbBtn>
    </Header>

  );
}

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