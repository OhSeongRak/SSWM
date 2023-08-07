import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import RecipeReviewCard from "./StudyRoomItem2";
import "./Style.css";
import axios from "axios";
import { useState, useEffect } from 'react';

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

const StudyRoomList = ({ option, searchKeyword, selectedTags, isPublic }) => {
  // const { option } = props;
  const [studyrooms, setStudyrooms] = useState([]);
  const [ref] = useInView();
  const token = JSON.parse(localStorage.getItem("accessToken"));

  const data = {
    "sortBy" : option === "인원순" ? "USER_NUM" : option === "최근순" ? "CREATED" : "STUDY_TIME", // 공부시간(STUDY_TIME), 인원(USER_NUM), 생성시간(CREATED), 
    "orderBy" : "DESC", // ASC
    "searchKeyword" : searchKeyword, // 방제목, 방아이디
    "tagNames" : selectedTags,
    "isPublic" : 1,
  };
  console.log(token);
  useEffect(() => {
    axios
      .post("/api/studyrooms/list", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setStudyrooms(response.data); // API 호출 완료 후에 studyrooms 업데이트
      })
      .catch((error) => {
        // 오류 처리
        console.log(error);
      });
      
  }, [option, searchKeyword, selectedTags, isPublic]);
    
  return (
    <RoomListLayout ref={ref}>
      <RoomList>
      {studyrooms.map((studyroom) => (
          <RecipeReviewCard key={studyroom.id} studyroom={studyroom} />
        ))}
      </RoomList>
    </RoomListLayout>
  );
};

export default StudyRoomList;
