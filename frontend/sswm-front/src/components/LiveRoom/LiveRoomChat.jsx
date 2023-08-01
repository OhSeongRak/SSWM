import React from "react";
import styled from "styled-components";

const LiveRoomChat = () => {
  return (
    <ContainerWrap>
      <ChatTopWrap>
        채팅기록
      </ChatTopWrap>
      <ChatBottomWrap>
        채팅입력
      </ChatBottomWrap>
    </ContainerWrap>
  )
}

const ContainerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 95%;
  height: 90%;
  border: 1px solid black;
  gap: 5%;
`
const ChatTopWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80%;
  border: 1px solid black;
`
const ChatBottomWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15%;
  border: 1px solid black;
`

export default LiveRoomChat;