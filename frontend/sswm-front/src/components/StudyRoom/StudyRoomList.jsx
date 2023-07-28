import styled from 'styled-components';
import StudyRoomItem from './StudyRoomItem';

const RoomListLayout = styled.div`
  flex: 1;
  background-color: green;
`;

const RoomList = styled.ul`
  background-color: #FFFFFF;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 5px;
`

const StudyRoomList = (props) => {
  return(
    <RoomListLayout>
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