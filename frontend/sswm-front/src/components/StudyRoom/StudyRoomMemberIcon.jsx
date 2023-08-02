import React from 'react';
import styled from 'styled-components';

import { styled as MuiStyled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

import def from '../../assets/fubao.jpg';

const StyledBadge = MuiStyled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 3px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: -1,
      left: -1,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const StudyRoomMemberIcon = () => {
  return (
    <ContainerWrap>
      <MemberTitleWrap>
        스터디원
      </MemberTitleWrap>

      <MemberWrap>
        <MemberContent>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt="Study-Member" src={def} sx={{ width: 60, height: 60 }} />
          </StyledBadge>
          Name
        </MemberContent>
        <MemberContent>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt="Study-Member" src={def} sx={{ width: 60, height: 60 }} />
          </StyledBadge>
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