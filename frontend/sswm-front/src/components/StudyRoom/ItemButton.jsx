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
    if (studyroom.maxUserNum === studyroom.userNum) {
      alert("이미 꽉 찬 방입니다.");
    }
    else {
      if (studyroom.public === false) {
        console.log("enterCode:::", enterCode);
        
        try {
          const response = await axios.get("/api/studyrooms/enterCode", {
            headers: {
              Authorization: accessToken,
            },
            params: {
              enterCode: enterCode,
              studyroomId: studyroom.id
            },
          });
      
          if (response.data === true) {
            // 비동기적으로 axios.post 실행
            try {
              await axios.post(`/api/studyrooms/${studyroom.id}/join`, {}, {
                headers: {
                  Authorization: accessToken,
                },
              });
              window.location.href = `/StudyRoomMember/${studyroom.id}`;
            } catch (error) {
              console.error("Error joining studyroom:", error);
            }
          } else {
            alert("잘못된 코드입니다. 다시 입력해주세요.");
          }
        } catch (error) {
          console.error("Error sending enterCode:", error);
        }
      }
      else {
        try {
          await axios.post(`/api/studyrooms/${studyroom.id}/join`, {}, {
            headers: {
              Authorization: accessToken,
            },
          });
          window.location.href = `/StudyRoomMember/${studyroom.id}`;
        } catch (error) {
          console.error("Error joining studyroom:", error);
        }
      }
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
