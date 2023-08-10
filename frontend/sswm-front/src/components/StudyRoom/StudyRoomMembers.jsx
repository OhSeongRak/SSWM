import React, { useState } from 'react';
import styled from 'styled-components';

import { styled as MuiStyled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';
import {useEffect} from 'react';
import axios from 'axios';
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

const StudyRoomMembers = ({studyroomId}) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const [studyPeople, setStudyPeople] = useState();
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("/api/studyrooms/"+studyroomId+"/search-user", {
          headers: {
            Authorization: token,
          },
        }); 
        setStudyPeople(response.data);
      } catch (error) {
        console.error("유저 데이터를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchMembers(); // 함수 실행
  }, [studyroomId]);
  return (
    <ContainerWrap>
      <MemberTitleWrap >
        <Background>
          스터디원
        </Background>
      </MemberTitleWrap>
      <MemberWrap>

      {studyPeople && 
      studyPeople.map((person,idx)=>
        person.inLive ? 
        <MemberContent key={idx}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
          <Avatar alt="Study-Member" src={person.userDto.image} sx={{ width: 60, height: 60 }} />
        </StyledBadge>
          <Nickname>
            {person.userDto.nickname}
          </Nickname>
        </MemberContent>
        :
        <MemberContent key={idx}>
          <Avatar alt="Study-Member" src={person.userDto.image} sx={{ width: 60, height: 60 }} />
          <div style={{display:"flex", textAlign: "center"}}>
          <Nickname>
            {person.userDto.nickname}
          </Nickname>
          </div>
        </MemberContent>
      )}
        
      
      </MemberWrap>
    </ContainerWrap>
  );
};
const Nickname = styled.div`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;  width: 70px;

`
const Background = styled.span`
  background-color: #F2CC47;  
  padding: 7px;
  border-radius : 10px;
`;
const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
const MemberTitleWrap = styled.div`
  width: 100%;
  font-size: 20px;
  font-family: "NanumSquareNeo";
  margin-bottom: 1vw;
`
const MemberWrap = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  gap: 1vw;
  border-radius: 15px;
`
const MemberContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70px;
`

export default StudyRoomMembers;