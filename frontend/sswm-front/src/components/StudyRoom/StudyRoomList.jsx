import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import RecipeReviewCard from "./StudyRoomItem2";
import "./Style.css";

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
  const [ref] = useInView();
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
        <RecipeReviewCard />
      </RoomList>
    </RoomListLayout>
  );
};

export default StudyRoomList;
