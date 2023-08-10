import React from 'react';
import styled from 'styled-components';


const StudyRoomMemberBoard = ({notice}) => {
  return (
    <ContainerWrap>
      <BoardWrap>
        <BoardTitle>
          공지사항
        </BoardTitle>
        <BoardContent>
          {notice}
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
  width: 100%;
  height: 90%;
`
const BoardTitle = styled.div`
width: 100%;
font-size: 20px;
padding : 20px 0px 0px 0px;
font-family: "NanumSquareNeo";
margin-bottom: 1vw;
`
const BoardContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 90%;
  border: 1px solid black;  
`

export default StudyRoomMemberBoard;