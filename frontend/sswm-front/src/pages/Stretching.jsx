import React, {useRef, useState, useEffect} from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

import Gnb from "../components/Gnb";
import Button from "@mui/material/Button";
import GFooter from "../components/GFooter";

import * as tmPose from "@teachablemachine/pose";

let model, webcam, ctx, maxPredictions;

const Streching = () => {

  const [currentScore, setCurrentScore] = useState(0);
  const [showState, setShowState] = useState(0);
  const [classSelected, setClassSelected] = useState(0);
  
  const stretchingPose = [
    "팔 오른쪽",
    "팔 왼쪽",
    "목 오른쪽",
    "목 왼쪽",
    "목 아래",
    "목 위",
    "팔 뒤 오른쪽(애매)",
    "팔 뒤 왼쪽(애매)",
    "팔 위쪽",
    "손 왼쪽(애매)",
    "손 오른쪽(애매)",
    "등 왼쪽",
    "등 오른쪽"
  ];

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

  const URL = "https://teachablemachine.withgoogle.com/models/Joe_qHU_I/";
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  //var remainingTime = 0;
  useEffect(() => {
    init(); 

    return () => {
    };
  }, []); 


  async function init() {

    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    maxScoreRef.current = 0;
    const width = 400;
    const height = 300;
    const flip = true; 
    webcam = new tmPose.Webcam(width, height, flip); 
    await webcam.setup(); 
    await webcam.play();
    await resetModel();

    
    const canvas = document.getElementById("canvas");
    canvas.width = width; canvas.height = height;
    ctx = canvas.getContext("2d");

    window.requestAnimationFrame(loop);

  }

  const resetModel = () => {
    sumScore.current += Math.floor(currentSumScore.current / 800);
    //setMaxScore(0); // 최고 점수 초기화
    maxScoreRef.current = 0;
    currentSumScore.current = 0;

    setCurrentScore(0); // 현재 점수 초기화
  };

  async function loop(timestamp) {
    webcam.update();
    if (remainingTime.current <= 0) {
        sc = null;
        resetModel();
        sc = getRandomClass();
        remainingTime.current = 100; 
    }

    if (sc !== null) {
      predict(sc);
      setClassSelected(sc);
      remainingTime.current -= 1;
    } 
    setTimeout(() => {
      window.requestAnimationFrame(loop);
  }, 10);

  }
  
  async function predict(selectClass) {

      const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);

      const prediction = await model.predict(posenetOutput);
      //const currentClassScore = Math.floor(prediction[selectClass].probability * 10000000);
      
      const currentClassScore = prediction[selectClass].probability * 100;
      setShowState(currentClassScore + Math.floor(Math.random() * 13));

      const intCurrentClassScore = Math.floor(currentClassScore);
      setCurrentScore(intCurrentClassScore);

      currentSumScore.current += intCurrentClassScore;
      if (intCurrentClassScore > maxScoreRef.current) {
        maxScoreRef.current = intCurrentClassScore;

        //await setMaxScore(currentClassScore);
      }
    
      // finally draw the poses
      drawPose(pose);
  }

  function drawPose(pose) {
      if (webcam.canvas) {
          ctx.drawImage(webcam.canvas, 0, 0);
          if (pose) {
              const minPartConfidence = 0.5;
              tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
              tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
          }
      }
  }

  function getRandomClass() {
    console.log(unusedIndexes.current.length);
    if (unusedIndexes.current.length === 0) {
      // 모든 숫자가 뽑혔을 경우 나가기
      window.close();
    }
  
    // 미사용 숫자 중에서 랜덤으로 선택
    const randomIndex = Math.floor(Math.random() * unusedIndexes.current.length);
    const result = unusedIndexes.current[randomIndex];
  
    // 선택된 숫자를 미사용 목록에서 제거
    unusedIndexes.current = unusedIndexes.current.filter(index => index !== result);
    console.log(unusedIndexes.current);
  
    return result;
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
            <ContentTimerWrapYoga>요가 타이머</ContentTimerWrapYoga> {/*hidden */}
            <ContentViewWrap>{stretchingPose[classSelected]}</ContentViewWrap>
            <ContentScoreWrap>누적점수 : {sumScore.current} / 1300 </ContentScoreWrap>
          </ContentLeftWrap>

          <ContentRightWrap> {/* 유저 화면 */}
            <ContentTimerWrap>{Math.floor(remainingTime.current / 100)}</ContentTimerWrap>
            <ContentViewWrap>
              <div><canvas id="canvas"></canvas></div>
              {/* <div ref={labelContainerRef}></div> */}
            </ContentViewWrap>
            <ContentTextWrap>
              <h1 style={{alignContent:'left'}}>최고 점수 : {maxScoreRef.current} / 100 </h1>
              <h1 style={{alignContent:'right'}}> 현재 점수 : {currentScore} / 100</h1></ContentTextWrap>
              <div style={{ display : 'none' }}>{showState}</div>
          </ContentRightWrap>
        </ContentWrap>

        <FooterWrap>
          <Link to="/LiveRoom">
            <Button variant="outlined">나가기</Button>
          </Link>
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
  height: 90vh;
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
  visibility: hidden;
`

const ContentViewWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 60%;
  border: 1px solid black;
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