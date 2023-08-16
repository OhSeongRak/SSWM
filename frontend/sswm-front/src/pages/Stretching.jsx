import axios from 'axios';
import React, {useRef, useState, useEffect} from "react";
import styled from "styled-components";
import pose0 from '../assets/stretching/pose0.jpg';
import pose1 from '../assets/stretching/pose1.jpg';
import pose2 from '../assets/stretching/pose2.jpg';
import pose3 from '../assets/stretching/pose3.jpg';
import pose4 from '../assets/stretching/pose4.jpg';
import pose5 from '../assets/stretching/pose5.jpg';
import pose6 from '../assets/stretching/pose6.jpg';
import pose7 from '../assets/stretching/pose7.jpg';
import pose8 from '../assets/stretching/pose8.jpg';
import pose9 from '../assets/stretching/pose9.jpg';
import pose10 from '../assets/stretching/pose10.jpg';
import pose11 from '../assets/stretching/pose11.jpg';
import pose12 from '../assets/stretching/pose12.jpg';
import pose13 from '../assets/stretching/pose13.jpg';
import { useParams } from 'react-router-dom';

import Gnb from "../components/Gnb";
import Button from "@mui/material/Button";
import GFooter from "../components/GFooter";

import * as tmPose from "@teachablemachine/pose";

let model, webcam, ctx;
const accessToken = JSON.parse(localStorage.getItem("accessToken"));
const Streching = () => {
  const { mySessionId } = useParams();

  const [currentScore, setCurrentScore] = useState(0);
  const [showState, setShowState] = useState(0);
  const [classSelected, setClassSelected] = useState(0);
  // ...

  //const [maxScore, setMaxScore] = useState(0);
  const unusedIndexes = useRef(Array.from({ length: 13 }, (_, i) => i));
  const maxScoreRef = useRef(0);
  const sumScore = useRef(0);
  const currentSumScore = useRef(0);
  const remainingTime = useRef(0);
  //const [remainingTime, setRemainingTime] = useState(0); // 초 단위로 초기화
  //const videoRef = useRef(null);
  //const labelContainerRef = useRef(null);
  var sc = null;
  const imagePaths = [
    pose0,
    pose1,
    pose2,
    pose3,
    pose4,
    pose5,
    pose6,
    pose7,
    pose8,
    pose9,
    pose10,
    pose11,
    pose12,
    pose13,
    // ... 다른 클래스에 대한 이미지 경로들
  ];
  


  const URL = "https://teachablemachine.withgoogle.com/models/Joe_qHU_I/";
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  const imagePath = imagePaths[classSelected + 1];
  //var remainingTime = 0;
  useEffect(() => {
    init(); 

    return () => {
    };
    // eslint-disable-next-line
  }, []); 


  async function init() {
    model = await tmPose.load(modelURL, metadataURL);
    maxScoreRef.current = 0;


    const flip = true; 
    webcam = new tmPose.Webcam(400, 300, flip); 
    if(webcam){
      await webcam.setup(); 
      await webcam.play();
      await resetModel();
    
      const canvas = document.getElementById("canvas");
      canvas.width = 400; canvas.height = 300;
      ctx = canvas.getContext("2d");

      window.requestAnimationFrame(loop);
    }
  }

  const resetModel = () => {
    sumScore.current += Math.floor(currentSumScore.current / 800);
    maxScoreRef.current = 0;
    currentSumScore.current = 0;

    setCurrentScore(0); // 현재 점수 초기화
  };

  async function loop(timestamp) {
    webcam.update();
    if (remainingTime.current <= 0) {
        sc = null;
        resetModel();
        while(sc === null || sc === 7 || sc === 8 || sc === 9 || sc === 10){
          sc = getRandomClass();
        }
        remainingTime.current = 800; 
    }

    if (sc !== null && sc !== undefined) {
      const cv = webcam.canvas;
      setTimeout(() => {
        if (cv){
          predict(sc, cv);
          setClassSelected(sc);
        }
        remainingTime.current -= 1;
      }, 10);
    } 
    window.requestAnimationFrame(loop);


  }
  
  async function predict(selectClass, cv) {
      if(cv){
        const { pose, posenetOutput } = await model.estimatePose(cv);
        const prediction = await model.predict(posenetOutput);
        if (prediction){
          const currentClassScore = prediction[selectClass].probability * 100;
          setShowState(currentClassScore + Math.floor(Math.random() * 13));

          const intCurrentClassScore = Math.floor(currentClassScore);
          setCurrentScore(intCurrentClassScore);

          currentSumScore.current += intCurrentClassScore;
          if (intCurrentClassScore > maxScoreRef.current) {
            maxScoreRef.current = intCurrentClassScore;
          }
        
          // finally draw the poses
          drawPose(pose, cv);
        }
      }
  }

  function drawPose(pose, cv) {
    ctx.drawImage(cv, 0, 0);
      if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
  }

  function getRandomClass() {
    if (unusedIndexes.current.length === 0) {
//    모든 숫자가 뽑혔을 경우 나가기
      axios
      .post(`/api/user-logs/${mySessionId}/stretching`, Math.floor(sumScore.current / 9), {
          headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
          },
      })
      .then(response => {
        console.log(response);
        outStretch();
      })
      .catch(error => {
          console.error('점수 전달 에러 :', error);
          outStretch();
      });
    }
  
    // 미사용 숫자 중에서 랜덤으로 선택
    const randomIndex = Math.floor(Math.random() * unusedIndexes.current.length);
    const result = unusedIndexes.current[randomIndex];
  
    // 선택된 숫자를 미사용 목록에서 제거
    unusedIndexes.current = unusedIndexes.current.filter(index => index !== result);
  
    return result;
  }

  function outStretch() {
    window.close();
  }
  
  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <HeaderWrap>
          * 점수 판정 기준 : Excellent 100 - 80, Good 80 - 60, nice 60 - 40, Bad 40 -
        </HeaderWrap>

        <ContentWrap>
          <ContentLeftWrap> {/* 요가 사진 */} 
            <ContentTimerWrapYoga>요가 타이머 : {classSelected}</ContentTimerWrapYoga> {/*hidden */}
            <ContentViewWrap>
              <img src={imagePath} alt="Selected Pose" style={{ maxWidth: '100%', maxHeight: '100%' }}/>
            </ContentViewWrap>
            <ContentScoreWrap>누적점수 : {sumScore.current} / 900 </ContentScoreWrap>
          </ContentLeftWrap>

          <ContentRightWrap> {/* 유저 화면 */}
            <ContentTimerWrap>{Math.floor(remainingTime.current / 100)}</ContentTimerWrap>
            <ContentViewWrap>
              <div><canvas id="canvas"></canvas></div>
            </ContentViewWrap>
            <ContentTextWrap>
              <h1 style={{alignContent:'left'}}>최고 점수 : {maxScoreRef.current} / 100 </h1>
              <h1 style={{alignContent:'right'}}> 현재 점수 : {currentScore} / 100</h1></ContentTextWrap>
              <div style={{ display : 'none' }}>{showState}</div>
          </ContentRightWrap>
        </ContentWrap>

        <FooterWrap>
            <Button variant="outlined" onClick={outStretch}>나가기</Button>
        </FooterWrap>
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
  height: 90%;
`
const HeaderWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  height: 5%;
`
const ContentWrap = styled.div`
  display: flex;
  width: 90%;
  height: 90%;
`
const ContentLeftWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 40%;
  height: 100%;
`
const ContentRightWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 60%;
  hgieht: 100%;
`
const ContentTimerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  font-size: 3vw;
`

const ContentTimerWrapYoga = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  font-size: 3vw;
  font-family: "NanumSquareNeo";
  visibility : hidden;
`

const ContentViewWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 60%;
  position: relative; /* 추가된 부분 */
  video {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 부모 요소에 맞춰 크기를 조정하되 비율 유지 */
  }
`
const ContentScoreWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  font-size: 3vw;
`
const ContentTextWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  font-size: 1vw;
`
const FooterWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;  
  width: 90%;
  height:5%;
`

export default Streching;