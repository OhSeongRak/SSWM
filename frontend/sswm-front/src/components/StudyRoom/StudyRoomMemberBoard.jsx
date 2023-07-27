import React from 'react';
import styled from 'styled-components';


const StudyRoomMemberBoard = () => {
  return (
    <ContainerWrap>
      <BoardWrap>
        <BoardTitle>
          공지사항
        </BoardTitle>
        <BoardContent>
          내용
        </BoardContent>
      </BoardWrap>
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1vw;
`
const BoardWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 90%;
  border: 1px solid black;  
`
const BoardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;
  border-bottom: 1px solid black;
`
const BoardContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 90%;
`

export default StudyRoomMemberBoard;