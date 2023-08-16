import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import RecipeReviewCard from "../StudyRoom/StudyRoomItem";

const MyStudyRoom = (props) => {
  const [studyrooms, setStudyrooms] = useState([]);
  const [ref] = useInView();
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  console.log(accessToken);
  useEffect(() => {
    axios
      .get(`{REACT_APP_BASE_URL}/api/studyrooms`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        setStudyrooms(response.data); // API 호출 완료 후에 studyrooms 업데이트
      })
      .catch((error) => {
        // 오류 처리
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <ContainerWrap>
      <TitleWrap>
        <Title>내 스터디룸</Title>
      </TitleWrap>
      <RoomListLayout ref={ref}>
        <RoomList>
          {studyrooms.map((studyroom) => (
            <RecipeReviewCard key={studyroom.id} studyroom={studyroom} isMyPage={true} />
          ))}
        </RoomList>
      </RoomListLayout>
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  width: 100%;
`;
const TitleWrap = styled.div`
  font-size: 25px;
  margin-top: 1vw;
  margin-bottom: 1vw;
`;
const Title = styled.span`
  border-radius: 10px;
  padding: 10px 10px;
  background: #a4dbe4;
`;
const RoomListLayout = styled.div`
  flex: 1;
  background-color: green;
  margin-top: 30px;
  margin-bottom: 100px;
`;

const RoomList = styled.ul`
  background-color: #ffffff;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 5px;
`;
export default MyStudyRoom;
