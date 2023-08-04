import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import RecipeReviewCard from "./StudyRoomItem2";
import "./Style.css";
import axios from "axios";
import { useState } from 'react';

const RoomListLayout = styled.div`
  flex: 1;
  background-color: green;
`;

const RoomList = styled.ul`
  background-color: #ffffff;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 5px;
`;

const StudyRoomList = (props) => {
  console.log("왜이리 호출할까")
  const [ref] = useInView();
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const data = {
    "sortBy" : "STUDY_TIME", // 공부시간(STUDY_TIME), 인원(USER_NUM), 생성시간(CREATED), 
    "orderBy" : "ASC", // ASC
    "searchKeyword" : "", // 방제목, 방아이디
    "tagNames" : [
    ]
  };

  let studyrooms = []; // 초기화

  axios
  .post("http://localhost:8080/api/studyrooms/list", data, {
    headers: {
      Authorization: token.accessToken,
    },
  })
  .then((response) => {
    studyrooms = response.data; // API 호출 완료 후에 studyrooms 업데이트
    console.log("studyrooms::::", response.data);
  });
    
  return (
    <RoomListLayout ref={ref}>
      <RoomList>
        <RecipeReviewCard />
        <RecipeReviewCard />
        <RecipeReviewCard />
        <RecipeReviewCard />
        <RecipeReviewCard />
        <RecipeReviewCard />
        <RecipeReviewCard />
        <RecipeReviewCard />
        <RecipeReviewCard />
        <RecipeReviewCard />
        <RecipeReviewCard />
        <RecipeReviewCard />
        <RecipeReviewCard />
        <RecipeReviewCard />
        <RecipeReviewCard />
      </RoomList>
    </RoomListLayout>
  );
};

export default StudyRoomList;
