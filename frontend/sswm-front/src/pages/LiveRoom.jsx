import React from "react";
import styled from "styled-components";
// import { Link } from 'react-router-dom';

import Gnb from "../components/Gnb";

//import LiveRoomSnackbar from "../components/LiveRoom/LiveRoomSnackbar";
//import LiveRoomFooter from "../components/LiveRoom/LiveRoomFooter";
//import LiveRoomView from "../components/LiveRoom/LiveRoomView";
//import LiveRoomChat from "../components/LiveRoom/LiveRoomChat";
import VideoRoomComponent from '../components/OpenVidu/VideoRoomComponent';

const LiveRoom = () => {
  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <ContentWrap>
          <VideoRoomComponent />
          {/* <ContentLiveView>
            <LiveRoomView />
          </ContentLiveView>
          <ContentLiveChat>
            <LiveRoomChat />
          </ContentLiveChat> */}
        </ContentWrap>

      </ContainerWrap>
    </div>
  );
};

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height:90vh;
`
// const HeaderWrap = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 90%;
//   height: 10vh;
// `
const ContentWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 80vh;
`
//const ContentLiveView = styled.div`
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  width: 80%;
//  height: 100%;
//  border: 1px solid black;
//`

//const ContentLiveChat = styled.div`
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  width: 20%;
//  height: 100%;
//  border: 1px solid black;
//`
// const FooterWrap = styled.div`
//   width: 100vw;
//   height: 10vh%; 
// `

export default LiveRoom;