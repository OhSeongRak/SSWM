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
  const handleButtonClick = () => {
    if (studyroom.public === false) {
    // axios GOGO
      console.log("enterCode:::", enterCode)
      // 패스워드를 서버로 보내는 Axios 요청
      axios.get("/api/studyrooms/enterCode", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          enterCode: enterCode,
          studyroomId: studyroom.id
        },
      })
      .then((response) => {
        if (response.data === true) {
          window.location.href = `/StudyRoomMember/${studyroom.id}`;
        } else {
          alert("잘못된 코드입니다. 다시 입력해주세요.");
        }
      })
      .catch((error) => {
        // 요청이 실패했을 때 수행할 작업
        console.error("Error sending enterCode:", error);
      });
    }
    else {
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
