import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { Link } from 'react-router-dom';

import Gnb from "../components/Gnb";

//import LiveRoomSnackbar from "../components/LiveRoom/LiveRoomSnackbar";
//import LiveRoomFooter from "../components/LiveRoom/LiveRoomFooter";
//import LiveRoomView from "../components/LiveRoom/LiveRoomView";
//import LiveRoomChat from "../components/LiveRoom/LiveRoomChat";
import VideoRoomComponent from '../components/OpenVidu/VideoRoomComponent';
import { useParams } from "react-router-dom";
import axios from 'axios';
import GFooter from "../components/GFooter";

const accessToken = JSON.parse(localStorage.getItem("accessToken"));

const LiveRoom = () => {
  const { studyroomId } = useParams();
  const [studyroom, setStudyroom] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state


  useEffect(() => {
    const fetchStudyroom = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/studyrooms/${studyroomId}`, {
          headers: {
            Authorization: accessToken,
          },
        });
        setStudyroom(response.data);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
      }
    };
    fetchStudyroom();
  }, [studyroomId]);

  return (
    <div>
      <ContainerWrap>
        <ContentWrap>
        {isLoading ? ( // Check loading state
            <div>Loading...</div>
          ) : (
            <VideoRoomComponent studyroomId={studyroomId} studyroom={studyroom} />
          )}
        </ContentWrap>
      </ContainerWrap>
      <GFooter/>
    </div>
  );
};

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
  width: 100%;
  height: 100%;
`
// const ContentLiveView = styled.div`
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  width: 80%;
//  height: 100%;
//  border: 1px solid black;
// `

// const ContentLiveChat = styled.div`
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