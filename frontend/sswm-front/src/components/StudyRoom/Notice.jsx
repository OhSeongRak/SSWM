import { Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const Notice = () => {
  const CONTENT_LIMIT = 300;

  const [studyroomDto, setStudyroomDto] = useState({
    notice: "오늘은 금요일입니다~",
  });

  const handleEnterCodeChange = (event) => {
    if (studyroomDto.notice != null) {
      setStudyroomDto({
        ...studyroomDto,
        notice: event.target.value, // 사용자가 입력한 값으로 업데이트
      });
    }
  };

  return (
    <ContainerWrap>
      <ContentWrap maxLength={CONTENT_LIMIT} onChange={handleEnterCodeChange}>
        {studyroomDto.notice}
      </ContentWrap>
      <BtnWrap>
        <Typography sx={{ marginRight: "10px" }}>
          {studyroomDto.notice.length}/{CONTENT_LIMIT}
        </Typography>
      </BtnWrap>
    </ContainerWrap>
  );
};
const ContainerWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eee;
`;
const ContentWrap = styled.textarea`
  type: text;
  width: 100%;
  height: 80%;
  font-size: 18px;
  border: 0;
  outline: none;
  resize: none;
  background-color: #eee;
  font-family: "NanumSquareNeo";
`;
const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 15%;
  margin: 0;
  padding: 0;
`;
export default Notice;
