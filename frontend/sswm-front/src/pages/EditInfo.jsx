import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Gnb from "../components/Gnb";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Snackbar } from "@mui/material";

import CustomModal from "../components/StudyRoom/deleteModal";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
let formData = new FormData();
const EditInfo = () => {
  const [users, setUsers] = useState([]);
  const [nickName, setNickName] = useState("");
  const [checkedNickName, setCheckedNickName] = useState("");
  const [originNickName, setOriginNickName] = useState("");
  const [imageSrc, setImage] = useState();

  const navigate = useNavigate();
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  useEffect(() => {
    axios
      .get("/api/users", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setUsers(response.data);
        setImage(`${process.env.REACT_APP_IMAGE_URL}/` + response.data.image);
        setNickName(response.data.nickname);
        setOriginNickName(response.data.nickname);
        console.log(response.data); 
      })
      .catch((error) => {
        console.log(error);
      });
       // eslint-disable-next-line
    }, []);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isExist, setIsExist] = useState(false);
  const imageUp = useRef();
  const onClickImage = () => {
    imageUp.current.click();
  };

  // 이미지 파일 변경
  const handleFileChange = (fileUp) => {
    const file = fileUp.target.files[0];

    if (file) {
      // 일단 formData를 초기화함으로써 파일이 여러개 추가되지않는다.
      formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", file.type);

      setImage(URL.createObjectURL(file));

      // formData를 보고싶으면 keys와 values 값을 봐야한다.
      for (const key of formData.keys()) {
        console.log(key);
      }
      for (const value of formData.values()) {
        console.log(value);
      }
    }
  };
  // 이름 변경
  const handleNameChange = (event) => {
    setNickName(event.target.value);
    console.log("닉네임 : " + nickName);
  };

  // 닉네임 중복 확인 함수
  const checkNickName = () => {
    console.log("닉네임 : " + nickName);

    setCheckedNickName(nickName);

    axios
      .get("/api/users/exists", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          nickname: nickName,
        },
      })
      .then((response) => {
        setIsExist(response.data);
        console.log(response.data);
        // isExist 값에 따라 중복 확인 로직을 수행
        if (response.data) {
          alert("중복된 닉네임입니다.");
        } else {
          alert("사용 가능한 닉네임입니다.");
        }
        console.log("중복 확인" + response.data);
        return response.data;
      })
      .catch((error) => {
        // 오류 처리
        console.log(error);
        alert("닉네임 확인 중 오류가 발생했습니다.");
        return true;
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("isExist : " + isExist);
    console.log("nickName :" + nickName);
    console.log("checkedNickName :" + checkedNickName);
    // 닉네임 중복확인
    if (originNickName !== nickName && (isExist || nickName !== checkedNickName)) {
      alert("닉네임의 중복 확인이 필요합니다.");
      return;
    }

    formData.append("nickname", nickName);

    // Axios 또는 Fetch API를 사용하여 formData를 서버로 전송
    // 예시로 Axios 사용
    axios
      .put("/api/users", formData, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/MyPage")
      })
      .catch((error) => {
        // 오류 처리
        alert("적용되지 않았습니다.");
        console.log(Error);
      });
  };
  const DeleteUser = () => {
    axios
    .delete("/api/users", {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((response) => {
      console.log(response.data);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.replace("/Login");
    })
    .catch((error) => {
      console.log(error);
    }, []);
  };
  // Snackbar
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const openSnackBar = () => setIsSnackBarOpen(true);
  const closeSnackBar = () => setIsSnackBarOpen(false);
  
  const closeModalEvent = () => {
    setIsModalOpen(false);
    openSnackBar(); // Open the CustomSnackBar after closing the modal
    DeleteUser()
  };
  console.log('수정페이지', accessToken)
  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <EditWrap>
          <EditContentWrap>
            <EditContent>
              <EditLeftContent>프로필</EditLeftContent>
              <EditRightContent>
                <input
                  type="file"
                  ref={imageUp}
                  style={{ display: "none" }}
                  onChange={handleFileChange} 
                />
                {imageSrc && (
                  <Avatar
                    onClick={onClickImage}
                    alt="Default Img"
                    src={imageSrc}
                    sx={{ width: 60, height: 60 }}
                  ></Avatar>
                )}
              </EditRightContent>
            </EditContent>
            <EditContent>
              <EditLeftContent>닉네임</EditLeftContent>
              <EditRightContent>
                <TextField
                  hiddenLabel
                  id="filled-hidden-label-normal"
                  variant="filled"
                  onChange={handleNameChange}
                  value = {nickName}
                />
                <Button variant="outlined" color="error" onClick={checkNickName} >
                  중복확인
                </Button>
              </EditRightContent>
            </EditContent>
            <EditContent>
              <EditLeftContent>이름</EditLeftContent>
              <EditRightContent>{users.name}</EditRightContent>
            </EditContent>
            <EditContent>
              <EditLeftContent>이메일</EditLeftContent>
              <EditRightContent>{users.email}</EditRightContent>
            </EditContent>
          </EditContentWrap>
        </EditWrap>

        <BtnWrap>
          <BtnLeftWrap>
            <div>
              <Button variant="contained" color="success" onClick={openModal}>
                회원 탈퇴하기
              </Button>
              <CustomModal isOpen={isModalOpen} closeModal={closeModal}>
                <Box>
                  <Typography variant="h6" component="h2">
                    탈퇴 시 서비스를 이용할 수 없습니다.
                    <br />
                    정말 삭제하시겠습니까?
                  </Typography>
                  <Button onClick={() => closeModalEvent(false)}>확인</Button>
                  <Button onClick={() => setIsModalOpen(false)}>취소</Button>
                </Box>
              </CustomModal>
              <Snackbar
                open={isSnackBarOpen}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                message="정상적으로 삭제되었습니다."
              />
            </div>
          </BtnLeftWrap>
          <BtnRightWrap>
            <ButtonCustom onClick={handleSubmit}>저장</ButtonCustom>
            <Link to="/MyPage" style={{ textDecoration: "none" }}>
              <ButtonCustom>취소</ButtonCustom>
            </Link>
          </BtnRightWrap>
        </BtnWrap>
      </ContainerWrap>
    </div>
  );
};

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
const EditWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 80%;
`;
const EditContentWrap = styled.div`
  width: 100%;
  height: 70%;
`;
const EditContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 25%;
`;
const EditLeftContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 100%;
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  font-size: 20px;
`;
const EditRightContent = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 0px 0px 3vw;
  width: 85%;
  height: 100%;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  font-size: 20px;
  gap: 2vw;
`;
const BtnWrap = styled.div`
  display: flex;
  height: 20%;
  width: 80%;
  justify-content: space-between;
`;
const BtnLeftWrap = styled.div``;
const BtnRightWrap = styled.div``;
const ButtonCustom = styled.button`
  background-color: #ffffff;
  border: 1px solid #fecc47;
  border-radius: 0.5rem;
  color: #111827;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
  padding: 0.45rem 1rem;
  text-align: center;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-select: none;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  margin-left: 1vw;
`;
export default EditInfo;
