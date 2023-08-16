import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios';

const CardHoverButton = (props) => {
  const {studyroom} = props;
  const [enterCode, setEnterCode] = useState("");
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  
  const buttonColor = props.type === "enter" ? "primary" : "error";

  const handleenterCodeChange = (event) => {
    setEnterCode(event.target.value);
  };
  
  const handleLeaveClick = () => {
    const confirmLeave = window.confirm("정말 탈퇴하시겠습니까?");
    if (confirmLeave) {
      axios.put(`/api/studyrooms/${studyroom.id}/leave`, {}, {
        headers: {
          Authorization: accessToken
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    window.location.reload();
  }

  const handleButtonClick = async () => {
    console.log("studyroomstudyroom", studyroom);
    const roomList = await axios.get(`/api/studyrooms`, {
      headers: {
        Authorization: accessToken,
      },
    });
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
        else if (message.data === "스터디룸 초과입니다.")
          alert("가입할 수 있는 스터디룸 개수를 초과하였습니다.");
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
        alert("가입이 불가능합니다.");
      else if (message.data !== "이미 가입됨" && roomList.data.length >= 5)
        alert("가입할 수 있는 스터디룸 개수를 초과하였습니다.");
      else
        window.location.href = `/StudyRoomMember/${studyroom.id}`;
    }
  };

  return (
    <div>
      <Button
        sx={{ margin: "10px", height: "40px", alignItems: "center"}}
        variant="outlined"
        onClick={handleButtonClick}
        color="primary"
        >
        입장하기
      </Button>
      {props.isHost === false && props.isMyPage === true && (
        <Button
        sx={{ margin: "10px", height: "40px", alignItems: "center"}}
        variant="outlined"
        onClick={handleLeaveClick}
        color="error"
        >
        탈퇴하기
        </Button>
      )}

      {studyroom.public === false && props.isHost === false && ( //비공개 and 방장x 
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
    </div>
  );
};

export default CardHoverButton;
