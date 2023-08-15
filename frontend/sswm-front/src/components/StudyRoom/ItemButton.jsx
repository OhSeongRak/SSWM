import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios';

const CardHoverButton = (props) => {
  const {studyroom} = props;
  const [enterCode, setEnterCode] = useState("");
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  
  const handleenterCodeChange = (event) => {
    setEnterCode(event.target.value);
  };
  // console.log(studyroom)
  const handleButtonClick = async () => {
    console.log("studyroomstudyroom", studyroom);
    
    // 비공개 방일 때
    if (studyroom.public === false) {
      // 입장 코드 확인
      const isEnterCodeMatch = await axios.get(`/api/studyrooms/enterCode`, {
        headers: {
          Authorization: accessToken,
        },
        params: {
          enterCode: enterCode,
          studyroomId: studyroom.id
        },
      });
      
      // 입장 코드가 일치할 때
      if (isEnterCodeMatch.data === true) {
        const message = await axios.post(`/api/studyrooms/${studyroom.id}/join`, {}, {
          headers: {
            Authorization: accessToken,
          },
        });
        // 정원 초과라면 가입 불가
        if (message.data === "정원 초과입니다.")
          alert(message.data);
        else if (message.data === "가입 불가")
          alert("사용자가 차단되었습니다.");
        // 가입
        else
          window.location.href = `/StudyRoomMember/${studyroom.id}`;
      
      } else { // 입장 코드가 일치하지 않음
        alert("잘못된 코드입니다. 다시 입력해주세요.");
      }
    }
    else {
      const message = await axios.post(`/api/studyrooms/${studyroom.id}/join`, {}, {
        headers: {
          Authorization: accessToken,
        },
      });
      // 정원 초과라면 가입 불가
      if (message.data === "정원 초과입니다.")
        alert(message.data);
      else if (message.data === "가입 불가")
        alert("사용자가 차단되었습니다.");
      else
        window.location.href = `/StudyRoomMember/${studyroom.id}`;
    }
  };
  return (
    <div>
      {studyroom.public === false && (
        <TextField
          sx={{
            margin: "30px",
            alignItems: "center",
            display: "inline-flex",
            justifyItems: "center",
          }}
          required
          id="outlined-required"
          label="enterCode"
          value={enterCode} // 입력된 패스워드 값 설정
          onChange={handleenterCodeChange} // 입력 시 호출되는 함수 설정
        />
      )}
      {/* <a
        href="/StudyRoomMember"
        type="button"
        onClick={handleButtonClick} // 버튼 클릭 시 handleButtonClick 함수 호출
        className="btn btn-light w-75 m-3 text-left"
      > */}
        <Button
          sx={{ margin: "10px", height: "40px", alignItems: "center" }}
          variant="outlined"
          onClick={handleButtonClick}
          >
          {props.txt}
        </Button>
    </div>
  );
};

export default CardHoverButton;
