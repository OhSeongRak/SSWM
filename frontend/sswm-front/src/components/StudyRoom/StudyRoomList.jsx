import styled from "styled-components";
import StudyRoomItem from "./StudyRoomItem";
import { useInView } from "react-intersection-observer";

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
  const [ref, inView] = useInView();
  return (
    <RoomListLayout ref={ref}>
      <RoomList>
        <StudyRoomItem />
        <StudyRoomItem />
        <StudyRoomItem />
        <StudyRoomItem />
        <StudyRoomItem />
        <StudyRoomItem />
        <StudyRoomItem />
        <StudyRoomItem />
        <StudyRoomItem />
        <StudyRoomItem />
        <StudyRoomItem />
        <StudyRoomItem />
      </RoomList>
    </RoomListLayout>
  );
};

export default StudyRoomList;
