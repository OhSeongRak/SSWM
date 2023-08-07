import React from "react";
import styled from "styled-components";

const Notice = () => {
  return(
    <ContainerWrap>
      <ContentWrap>
        오늘은 금요일입니다~
      </ContentWrap>
      <BtnWrap>
        <Button>저장</Button>
      </BtnWrap>
    </ContainerWrap>
  )
}
const ContainerWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eee;
`
const ContentWrap = styled.textarea`
  type: text;
  width: 100%;
  height: 80%;
  font-size: 18px;
  border: 0;
  outline: none;
  resize: none;
  background-color: #eee;
  font-family: 'NanumSquareNeo';
`
const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 15%;
  margin: 0;
  padding: 0;
`
const Button = styled.button`
  font-family: 'NanumSquareNeo';
  margin-right: 1vw;
`
export default Notice;