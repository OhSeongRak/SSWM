import React from "react";
import styled from "styled-components";

import LiveRoomViewItem from "./LiveRoomViewItem";


const LiveRoomView = () => {
  return (
    <ContainerWrap>
      <ViewWrap>
        <LiveRoomViewItem />
        <LiveRoomViewItem />
        <LiveRoomViewItem />
        <LiveRoomViewItem />
        <LiveRoomViewItem />
        <LiveRoomViewItem />
        <LiveRoomViewItem />
        <LiveRoomViewItem />
        <LiveRoomViewItem />
      </ViewWrap>
    </ContainerWrap>
  )
}

const ContainerWrap = styled.div`
  width: 95%;
  height: 90%;
`
const ViewWrap = styled.div`
  width: 100%;
  height: 100%;
  display:grid; 
  grid-gap: 1vw; 
  grid-template-columns: repeat(3, minmax(auto, 1fr));
  align-items: center; 
  justify-content: space-around;
`

export default LiveRoomView;