import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Gnb from "../components/Gnb";

import MyProfile from "../components/Mypage/MyProfile";
// import Tree from "../components/Mypage/Tree";
import MyStudyRoom from "../components/Mypage/MyStudyRoom";
import ScheduleCalendar from "../components/Mypage/ScheduleCalendar";
// import Piechart from "../components/Mypage/Chart";
import axios from "axios";
import GFooter from "../components/GFooter";

const MyPage = () => {
  const [users, setUsers] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/users`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setUsers(response.data);
        console.log("user:::", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  const handleSidebarItemClick = (e, sectionId) => {
    e.preventDefault();

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <SidebarWrap>
          <SidebarItem href="#" onClick={(e) => handleSidebarItemClick(e, "nav1")}>
            내 프로필
          </SidebarItem>
          <SidebarItem href="#" onClick={(e) => handleSidebarItemClick(e, "nav2")}>
            내가 키운나무 도감
          </SidebarItem>
          <SidebarItem href="#" onClick={(e) => handleSidebarItemClick(e, "nav3")}>
            내 스터디룸
          </SidebarItem>
          <SidebarItem href="#" onClick={(e) => handleSidebarItemClick(e, "nav4")}>
            캘린더
          </SidebarItem>
        </SidebarWrap>

        <ContentWrap>
          <ProfileWrap id="nav1">
            <MyProfile users={users} />
          </ProfileWrap>

          <MyStudyWrap id="nav3">
            <MyStudyRoom />
          </MyStudyWrap>

          <CalendarWrap id="nav4">
            <ScheduleCalendar />
          </CalendarWrap>
        </ContentWrap>
      </ContainerWrap>
      <GFooter />
    </div>
  );
};

const ContainerWrap = styled.div`
  display: flex;
  text-align: start;
  width: 90%;
  border-radius: 15px;
  background: #ffffff;
`;

const SidebarWrap = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  position: fixed;
  top: 25%;
  left: 12%;
  @media (min-width: 768px) {
    width: 10%;
  }

  @media (min-width: 992px) {
    width: 10%;
  }

  @media (min-width: 1200px) {
    width: 10%;
  }
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-left: 23%;
`;

const ProfileWrap = styled.a``;
// const TreeWrap = styled.a``;
const MyStudyWrap = styled.a``;
const CalendarWrap = styled.a``;

const SidebarItem = styled.a`
  display: block;
  padding: 10px;
  text-decoration: none;
  color: black;
  font-weight: bold;
`;

export default MyPage;
