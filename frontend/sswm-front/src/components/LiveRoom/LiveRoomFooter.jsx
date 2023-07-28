import React from "react";
import styled from "styled-components";

const LiveRoomFooter = () => {
  return (
    <ContainerWrap>
      <FooterTitle>
        스트레칭
      </FooterTitle>
      <FooterTitle>
        휴식설정
      </FooterTitle>
      <FooterTitle>
        나가기
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