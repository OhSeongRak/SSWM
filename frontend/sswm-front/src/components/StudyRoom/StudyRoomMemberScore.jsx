import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';
import { Avatar } from "@mui/material";

const StudyRoomMemberScore = ({studyroomId}) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const [top3Study, setTop3Study] = useState();
  const [top3Attend, setTop3Attend] = useState();

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  useEffect(() => {
    const fetchTop3Attend = async () => {
      try {
        const response = await axios.get(`/api/studyrooms/${studyroomId}/daily-attend`, {
          headers: {
            Authorization: accessToken,
          },
        });
        console.log("TOP3 Attend : ",response.data);
        setTop3Attend(response.data);
    
      } catch (error) {
        console.error("유저 데이터를 가져오는 데 실패했습니다:", error);
      }
    };
    const fetchTop3Study = async () => {// 출석률 top3
      try {
        const response = await axios.get(`/api/studyrooms/${studyroomId}/daily-study`, {
          headers: {
            Authorization: accessToken,
          },
        });
        console.log("TOP3 STUDY : ",response.data);
        setTop3Study(response.data);

      } catch (error) {
        console.error("유저 데이터를 가져오는 데 실패했습니다:", error);
      }
    };   
      
    // 공부량 top3
   fetchTop3Study();
   // 출석률 top3
   fetchTop3Attend();
  },[studyroomId,accessToken]);
  return (
    <ContainerWrap>
      <ScoreWrap>
        {top3Study&&
        <ContentWrap>
          <ContentTitle>
            일일 공부왕
          </ContentTitle>
          <ContentRank>
            <ContentRankValueWrap>
              {top3Study && top3Study.map((v, idx)=>
                <ContentRankValue key={idx}>
                  <MemberContent key={idx}>
                  <div>{formatTime(v.studyTime)}</div>
                  <Avatar alt="Study-Member" src={`${process.env.REACT_APP_IMAGE_URL}/${v.userDto.image}`} />
                  <div style={{display:"flex", textAlign: "center"}}>
                    <Nickname>
                      {v.userDto.nickname}
                    </Nickname>
                  </div>
                </MemberContent>
                </ContentRankValue>
              )
            
              }
            </ContentRankValueWrap>
          </ContentRank>
        </ContentWrap>
        }
        {top3Attend &&
        <ContentWrap>
         <ContentTitle>
            {top3Attend.month}월 출석왕
          </ContentTitle>
          <ContentRank>
            <ContentRankValueWrap>
            { top3Attend.users &&
              top3Attend.users.map((user,idx)=>
              <ContentRankValue key={idx}>
                <MemberContent key={idx}>
                  <div>{user.attendDays}/{top3Attend.daysOfMonth}</div>
                  <Avatar alt="Study-Member"src={`${process.env.REACT_APP_IMAGE_URL}/${user.userDto.image}`} />
                  <div style={{display:"flex", textAlign: "center"}}>
                    <Nickname>
                      {user.userDto.nickname}
                    </Nickname>
                  </div>
                </MemberContent>
              </ContentRankValue>

              
              )
            }
            
            </ContentRankValueWrap>
          </ContentRank>
        </ContentWrap>}
      </ScoreWrap>
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 1vw;
`
const ScoreWrap = styled.div`
  display: flex;
  width: 90%;
  height: 90%;
  gap: 3vw;
`
const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
`
const ContentTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;
  background-color: #b2dfdb;
  font-size: 20px;
  border-bottom: 1px solid #b2dfdb;
`
const ContentRank = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 90%;
`

const ContentRankValueWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 15%;
`
const ContentRankValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`
const MemberContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
`
const Nickname = styled.div`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;  width: 80px;
`
export default StudyRoomMemberScore;