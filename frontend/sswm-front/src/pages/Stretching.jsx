import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

import Gnb from "../components/Gnb";
import Button from "@mui/material/Button";
import GFooter from "../components/GFooter";

import * as tmPose from "@teachablemachine/pose";

let model, webcam, ctx, maxPredictions;

const Streching = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  console.log(maxScore);
  //const [remainingTime, setRemainingTime] = useState(0); // 초 단위로 초기화
  //const videoRef = useRef(null);
  //const labelContainerRef = useRef(null);
  var sc = null;

  const URL = "https://teachablemachine.withgoogle.com/models/Joe_qHU_I/";
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  var remainingTime = 0;
  useEffect(() => {
    console.log("여기도 계속 불림?");
    init(); 

    return () => {
    };
  }, []); 
  useEffect(() => {
    console.log("maxScore updated:", maxScore);
  }, [maxScore]);

  async function init() {

    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

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

  const resetModel = async () => {
    console.log("리셋 모델은 계속 불려?");
    setMaxScore(0); // 최고 점수 초기화
    setCurrentScore(0); // 현재 점수 초기화
  };

  async function loop(timestamp) {
    webcam.update();
    if (remainingTime <= 0) {
      console.log("reset");
        sc = null;
        await resetModel();
        sc = getRandomClass();
        remainingTime = 120; 
        console.log(remainingTime);
    }

    if (sc !== null) {
      predict(sc);
      remainingTime -= 1;
    } 
    setTimeout(() => {
      window.requestAnimationFrame(loop);
  }, 1000);

  }
  
  async function predict(selectClass) {

      const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);

      const prediction = await model.predict(posenetOutput);
      //const currentClassScore = Math.floor(prediction[selectClass].probability * 10000000);
      const currentClassScore = prediction[selectClass].probability * 10000000;
      setCurrentScore(currentClassScore);

      if (currentClassScore > maxScore) {
        await setMaxScore(currentClassScore);
        console.log(maxScore);
        console.log(currentClassScore);
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
    // 랜덤 클래스를 선택하는 로직을 여기에 추가
    // 예를 들어, 0부터 maxPredictions - 1 사이의 랜덤 숫자를 반환할 수 있습니다.
    var result = Math.floor(Math.random() * maxPredictions);
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
            <ContentTimerWrap>요가 타이머</ContentTimerWrap>
            <ContentViewWrap>요가 이미지</ContentViewWrap>
            <ContentScoreWrap>누적점수</ContentScoreWrap>
          </ContentLeftWrap>

          <ContentRightWrap> {/* 유저 화면 */}
            <ContentTimerWrap>유저 타이머</ContentTimerWrap>
            <ContentViewWrap>
              <div><canvas id="canvas"></canvas></div>
              {/* <div ref={labelContainerRef}></div> */}
            </ContentViewWrap>
            <ContentTextWrap>
              <div>최고 점수 : {maxScore}</div>
              <div>현재 점수 : {currentScore}</div></ContentTextWrap>
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
  font-family: "NanumSquareNeo";
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
  font-family: "NanumSquareNeo";
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
  font-family: "NanumSquareNeo";
`
const ContentTextWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  font-size: 1vw;
  font-family: "NanumSquareNeo";
`
const FooterWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;  
  width: 90%;
  height:5%;
`

export default Streching;