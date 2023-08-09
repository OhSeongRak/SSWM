import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Gnb from "../components/Gnb";

import MyProfile from "../components/Mypage/MyProfile";
// import Tree from "../components/Mypage/Tree";
import MyStudyRoom from "../components/Mypage/MyStudyRoom";
import Calendar from "../components/Mypage/Calendar";
// import Piechart from "../components/Mypage/Chart";
import axios from "axios";

const MyPage = () => {
  const [users, setUsers] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  
  
  // const isTokenValid = useToken();
  
  // if (!isTokenValid) {
  //   alert("로그인이 필요합니다.");
  //   return navigate("/Login");
  // }
  
  useEffect(() => {

    // if (!isTokenValid) {
    //   alert("로그인이 필요합니다.");
    //   return navigate("/Login");
    // }
    axios
      .get("/api/users", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setUsers(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
       // eslint-disable-next-line
    }, []);

  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <SidebarWrap>
          <SidebarItem href="#nav1">내 프로필</SidebarItem>
          <SidebarItem href="#nav2">내가 키운나무 도감</SidebarItem>
          <SidebarItem href="#nav3">내 스터디룸</SidebarItem>
          <SidebarItem href="#nav4">캘린더</SidebarItem>
        </SidebarWrap>

        <ContentWrap>
          <ProfileWrap name="nav1">
            <MyProfile users={users} />
          </ProfileWrap>

          <MyStudyWrap name="nav3">
            <MyStudyRoom />
          </MyStudyWrap>

          <CalendarWrap name="nav4">
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
// const TreeWrap = styled.a``;
const MyStudyWrap = styled.a``;
const CalendarWrap = styled.a``;

const SidebarItem = styled.a`
  display: block;
  padding: 10px;
  font-family: "NanumSquareNeo";
  text-decoration: none;
`;

export default MyPage;