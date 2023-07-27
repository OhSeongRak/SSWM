import React from 'react';
import styled from 'styled-components';

import Avatar from '@mui/material/Avatar';

import def from '../../assets/fubao.jpg';

const StudyRoomMemberIcon = () => {
  return (
    <ContainerWrap>
      <MemberTitleWrap>
        스터디원
      </MemberTitleWrap>

      <MemberWrap>
        <MemberContent>
          <Avatar alt="Study-Member" src={def} sx={{ width: 60, height: 60 }} />
          Name
        </MemberContent>
        <MemberContent>
          <Avatar alt="Study-Member" src={def} sx={{ width: 60, height: 60 }} />
          Name
        </MemberContent>
        <MemberContent>
          <Avatar alt="Study-Member" src={def} sx={{ width: 60, height: 60 }} />
          Name
        </MemberContent>
      </MemberWrap>
      
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
const MemberTitleWrap = styled.div`
  width: 100%;
  height: 10%;
  font-size: 20px;
  font-family: "NanumSquareNeo";
  margin-bottom: 1vw;
`
const MemberWrap = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  gap: 1vw;
`
const MemberContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default StudyRoomMemberIcon;