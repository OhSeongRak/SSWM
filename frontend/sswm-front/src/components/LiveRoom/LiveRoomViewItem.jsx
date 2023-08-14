import { React, useState } from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const LiveRoomViewItem = () => {
  const [alarm, setAlarm] = useState(false);
  const handleAlarm = () => {
    setAlarm(!alarm)
  }
  return (
    <ViewContent>
      <ContentTop>
        <ContentTopLeft>
          <NameText>
            김싸피
          </NameText>
          <span>
            <IconButton aria-label="alarm-on" onClick={handleAlarm}>
              { alarm ? (
                <NotificationsNoneIcon />
              ) : (
                <NotificationsOffIcon />
              )}
            </IconButton>
          </span>
        </ContentTopLeft>
        <ContentTopRight>
          <span>
            <LocalFireDepartmentIcon />
          </span>
          <NameText>
            03:00
          </NameText>
        </ContentTopRight>
      </ContentTop>
    </ViewContent>
  )
}

const ViewContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;  
  height: 100%;
  border: 3px solid orange;
  border-radius: 15px;
`
const ContentTop = styled.div`
  display: flex;
  justify-content : space-between;
  width: 90%;
  height: 20%;
  margin-top: 0.5vw;
`
const ContentTopLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  height: 100%;
`
const ContentTopRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  height: 100%;
  gap: 0.2vw;
`
const NameText = styled.text`
  font-size: 20px;
`
export default LiveRoomViewItem;