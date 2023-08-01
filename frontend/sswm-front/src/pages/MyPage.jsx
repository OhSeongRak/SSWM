import React from "react";
import styled from "styled-components";

import Gnb from "../components/Gnb";

import MyProfile from "../components/Mypage/MyProfile";
import Tree from "../components/Mypage/Tree";
import MyStudyRoom from "../components/Mypage/MyStudyRoom";
import Calendar from "../components/Mypage/Calendar";
import Piechart from "../components/Mypage/Chart";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect, useParams } from 'react-router-dom';

const MyPage = () => {
  //   const dispatch = useDispatch();
  //   const profileList = useSelector((state) => state.profile)
  //   const sessionStoragetokenCheck = sessionStorage.getItem('Authorization')
  //   const param = useParams();

  //  if(!sessionStoragetokenCheck){
  //   return(
  //     alert('로그인 후 입장가능합니다.'),
  //     <Redirect to={'/login'}/>
  //   )
  //  }

  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <SidebarWrap>
          <SidebarItem href="#nav1">내 프로필</SidebarItem>
          <SidebarItem href="#nav2">내 스터디룸</SidebarItem>
          <SidebarItem href="#nav3">캘린더</SidebarItem>
          <SidebarItem href="#nav4">내가 키운나무 도감</SidebarItem>
        </SidebarWrap>

        <ContentWrap>
          <ProfileWrap name="nav1">
            <MyProfile />
          </ProfileWrap>

          <TreeWrap name="nav4">
            <Tree />
          </TreeWrap>

          <MyStudyWrap name="nav2">
            <MyStudyRoom />
          </MyStudyWrap>

          <CalendarWrap name="nav3">
            <Calendar />
          </CalendarWrap>
        </ContentWrap>
      </ContainerWrap>
    </div>
  );
};

const ContainerWrap = styled.div`
  width: 80%;
  display: flex;
  text-align: start;
  border-radius: 15px;
  background: #ffffff;
`;

const SidebarWrap = styled.div`
  position: fixed;
  top: 10%;
  width: 15%;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  gap: 50px;
  margin-left: 20%;
`;

const ProfileWrap = styled.a``;
const TreeWrap = styled.a``;
const MyStudyWrap = styled.a``;
const CalendarWrap = styled.a``;

const SidebarItem = styled.a`
  display: block;
  padding: 10px;
  font-family: "NanumSquareNeo";
  text-decoration: none;
`;

export default MyPage;
