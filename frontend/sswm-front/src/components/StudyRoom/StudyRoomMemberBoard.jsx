import React from 'react';
import styled from 'styled-components';


const StudyRoomMemberBoard = ({notice}) => {
  return (
    <ContainerWrap>
      <BoardWrap>
        <BoardTitle>
          <Background>
            공지사항
          </Background>
          
        </BoardTitle>
        <BoardContent>
          <div>{notice}</div>
        </BoardContent>
      </BoardWrap>
    </ContainerWrap>
  );
};
const Background = styled.span`
  background-color: #F2CC47;  
  padding: 7px;
  border-radius : 10px;
`;
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
  margin: 10px;
  display: flex;
  width: 100%;
  height: 90%;
  border: 1px solid gray;  
  border-radius: 10px;
`

export default StudyRoomMemberBoard;