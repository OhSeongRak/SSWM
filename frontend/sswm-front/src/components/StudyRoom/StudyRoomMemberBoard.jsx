import React from "react";
import styled from "styled-components";

const StudyRoomMemberBoard = ({ notice }) => {
  // '.'을 만날 때마다 줄 바꿈 추가하는 함수
  const formatNotice = (text) => {
    return text ? text.split('.').join('.\n') : ''; // notice가 undefined일 경우에 대한 처리
  };

  return (
    <ContainerWrap>
      <BoardWrap>
        <BoardTitle>
          <Background>
            공지사항
          </Background>
        </BoardTitle>
        <BoardContent>
          <Boardnotice>{formatNotice(notice)}</Boardnotice>
        </BoardContent>
      </BoardWrap>
    </ContainerWrap>
  );
};

const Background = styled.span`
  background-color: #F2CC47;
  padding: 7px;
  border-radius: 10px;
`;
const ContainerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1vw;
`;
const BoardWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90%;
`;
const BoardTitle = styled.div`
  width: 100%;
  font-size: 20px;
  padding: 20px 0px 0px 0px;
  margin-bottom: 1vw;
`;
const BoardContent = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  border: 2px solid #b2dfdb;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;
const Boardnotice = styled.div`
  width: 95%;
  height: 90%;
  white-space: pre-line; /* 줄 바꿈을 표시하기 위한 스타일 */
`;

export default StudyRoomMemberBoard;
