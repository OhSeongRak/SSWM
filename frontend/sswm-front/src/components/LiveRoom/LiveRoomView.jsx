import React from "react";
import styled from "styled-components";

const LiveRoomView = () => {
  return (
    <ContainerWrap>
      <ViewWrap>
        <ViewContent />
        <ViewContent />
        <ViewContent />
        <ViewContent />
        <ViewContent />
        <ViewContent />
        <ViewContent />
        <ViewContent />
        <ViewContent />
      </ViewWrap>
    </ContainerWrap>
  )
}

const ContainerWrap = styled.div`
  width: 95%;
  height: 90%;
  border: 1px solid black;
`
const ViewWrap = styled.div`
  width: 100%;
  height: 100%;
  display:grid; 
  grid-gap: 5px; 
  grid-template-columns: repeat(3, minmax(auto, 1fr));
  align-items: center; 
  justify-content: space-around;
`
const ViewContent = styled.div`
  width: 100%;  
  height: 100%;
  border: 1px solid black;
`
export default LiveRoomView;