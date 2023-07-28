import React from "react";
import styled from "styled-components";

const LiveRoomSnackbar = () => {
  return (
    <ContainerWrap>
      <Snackbar />
    </ContainerWrap>
  )
}

const ContainerWrap = styled.div`
  width: 60%;
  height: 50%;
`
const Snackbar = styled.div`
  padding: 20px 75px 20px 44px;
  background: white;
  border: 3px solid orange;
  border-radius: 35px;
  font-weight: 700;
  font-size: 20px;
`;

export default LiveRoomSnackbar;