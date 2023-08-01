import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";



const LiveRoomFooter = () => {
  return (
    <ContainerWrap>
      <FooterTitle>
        <Button sx={{ color: 'white' }}>
          스트레칭
        </Button>
      </FooterTitle>
      <FooterTitle>
        <Button sx={{ color: 'white' }}>
          휴식설정
        </Button>
      </FooterTitle>
      <FooterTitle>
        <Link to="/">
          <Button sx={{ color: 'white' }}>
            나가기
          </Button>
        </Link>
      </FooterTitle>
    </ContainerWrap>
  )
}

const ContainerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: green;
  color: white;
  gap: 5vw;
`
const FooterTitle = styled.div`
`

export default LiveRoomFooter;