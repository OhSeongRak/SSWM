import React from 'react';
import styled from 'styled-components';


const StudyRoomMemberChat = () => {
  return (
    <ContainerWrap>
      <ChatTitleWrap>
        우리끼리 이야기
      </ChatTitleWrap>

      <ChatContentWrap>
        <ChatContentTop>

        </ChatContentTop>
        <ChatContentBottom>

        </ChatContentBottom>
      </ChatContentWrap>
      
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1vw;
`
const ChatTitleWrap = styled.div`
  width: 100%;
  height: 10%;
  font-size: 20px;
  margin-bottom: 0.5vw;
`
const ChatContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
  width: 100%;
  height: 90%;
  gap: 1vw;
`
const ChatContentTop = styled.div`
  width: 90%;
  height: 80%;
  border: 1px solid black;
`
const ChatContentBottom = styled.div`
  width: 90%;
  height: 20%;
  border: 1px solid black;
`

export default StudyRoomMemberChat;