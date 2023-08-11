import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Gnb from "../components/Gnb";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import GroupsIcon from "@mui/icons-material/Groups";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Paper from "@mui/material/Paper";
import ForestIcon from "@mui/icons-material/Forest";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { styled as muistyled } from "@mui/material/styles";
import { Avatar, RadioGroup, Snackbar } from "@mui/material";

import def from "../assets/dolphin.jpg";
import CustomModal from "../components/StudyRoom/deleteModal";
import { Box, Switch, Typography } from "@mui/material";

import MemberTable from "../components/StudyRoom/MemberTable";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import MultipleSelectChip from "../components/StudyRoom/Tags";
import GFooter from "../components/GFooter";

const Item = muistyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

let formData;

const StudyRoomAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Snackbar
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const openSnackBar = () => setIsSnackBarOpen(true);
  const closeSnackBar = () => setIsSnackBarOpen(false);

  const { studyroomId } = useParams();
  const [studyroomDto, setStudyroomDto] = useState([]);

  const [isExist, setIsExist] = useState(true);

  const [checkedStudyroomName, setCheckedStudyroomName] = useState("");

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const navigate = useNavigate();

  // const dispatch = useDispatch();
  // const studyroom = useSelector((state) => state.studyroom);

  useEffect(() => {
    formData = new FormData();
    console.log("userEffect");
    axios
      .get(`/api/studyrooms/${studyroomId}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setStudyroomDto(response.data); // API 호출 완료 후에 studyrooms 업데이트
        console.log("studyroom", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [studyroomId, accessToken]);

  const [imageSrc, setImage] = useState(def);

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

  // name 입력란이 변경될 때마다 studyroom의 name 속성 업데이트
  const handleNameChange = (event) => {
    setStudyroomDto({
      ...studyroomDto,
      name: event.target.value, // 사용자가 입력한 값으로 업데이트
    });
  };

  // 스터디룸 이름 중복 확인 함수
  const checkStudyroomName = (event) => {
    // 여기에 스터디룸 이름 중복 확인 요청을 보내는 코드 작성
    console.log("스터디룸 이름 : " + studyroomDto.name);

    setCheckedStudyroomName(studyroomDto.name);

    axios
      .get("/api/studyrooms/exists", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          name: studyroomDto.name,
        },
      })
      .then((response) => {
        setIsExist(response.data);
        console.log(response.data);
        // isExist 값에 따라 중복 확인 로직을 수행
        if (response.data) {
          alert("중복된 스터디룸 이름입니다.");
        } else {
          alert("사용 가능한 스터디룸 이름입니다.");
        }
        console.log("중복 확인" + response.data);
      })
      .catch((error) => {
        // 오류 처리
        console.log(error);
        alert("스터디룸 이름 확인 중 오류가 발생했습니다.");
      });
  };

  // 공개 설정
  const handleIsPublicChange = (event) => {
    if (event.target.checked) {
      setStudyroomDto({
        ...studyroomDto,
        enterCode: null, // 암호를 NULL값으로 초기화
        isPublic: event.target.checked,
      });
    } else {
      setStudyroomDto({
        ...studyroomDto,

        isPublic: event.target.checked,
      });
    }
  };

  // enterCode 입력란이 변경될 때마다 studyroom의 enterCode 속성 업데이트
  const handleEnterCodeChange = (event) => {
    const newEnterCode = event.target.value;

    if (newEnterCode != null) {
      setStudyroomDto((studyroomDto) => ({
        ...studyroomDto,
        enterCode: newEnterCode,
      }));
    }
  };

  // maxUserNum 값 변경
  const handleMaxUserNumChange = (value) => {
    if (value >= 1 && value <= 9) {
      setStudyroomDto({
        ...studyroomDto,
        maxUserNum: value, // 인원 수 값으로 업데이트
      });
    }
  };

  // maxRestTime 값 변경
  const handleMaxRestTimeChange = (value) => {
    if (value >= 90 && value <= 240) {
      setStudyroomDto({
        ...studyroomDto,
        maxRestTime: value, // 휴식 시간 값으로 업데이트
      });
    }
  };

  // tag값 변경
  const handleTagsChange = (selectedTags) => {
    setStudyroomDto((studyroomDto) => ({
      ...studyroomDto,
      tags: selectedTags,
    }));
  };

  //enterCode
  const CHARACTER_LIMIT = 8;

  const codeValidation = () => {
    let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"ㄱ-ㅎ | ㅏ-ㅣ |가-힣]/;
    const comment = "알파벳,숫자 포함하여 8자리로 설정해주세요";

    if (check.size !== 8 && check.test(studyroomDto.enterCode)) {
      return comment;
    }
    return null;
  };

  //notice
  const CONTENT_LIMIT = 300;

  const handleEnterNoticeChange = (event) => {
    setStudyroomDto((studyroomDto) => ({
      ...studyroomDto,
      notice: event.target.value, // 사용자가 입력한 값으로 업데이트
    }));
  };

  //수정처리
  const handleSubmit = (event) => {
    event.preventDefault();

    // 스터디룸 제목 중복확인
    if (isExist || studyroomDto.name !== checkedStudyroomName) {
      alert("스터디룸 제목의 중복 확인이 필요합니다.");
      return;
    }

    // 코드 유효성 검사
    const codeValidationError = codeValidation();

    if (codeValidationError) {
      alert(codeValidationError); // 오류 메시지를 사용자에게 알려줌
      return;
    }

    console.log(accessToken);

    console.log("태그 : " + studyroomDto.tags);

    formData.append(
      "studyroom",
      new Blob([JSON.stringify(studyroomDto)], { type: "application/json" })
    );

    for (const key of formData.keys()) {
      console.log(key);
    }
    for (const value of formData.values()) {
      console.log(value);
    }

    // Axios 또는 Fetch API를 사용하여 formData를 서버로 전송
    // 예시로 Axios 사용
    axios
      .put(`/api/studyrooms/${studyroomId}`, formData, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("스터디방이 수정되었습니다.");
        navigate(`/StudyRoomMember/${studyroomId}`);
      })
      .catch((error) => {
        // 오류 처리
        console.log(Error);
        alert("스터디방이 수정되지 않았습니다.");
      });
    navigate(`/StudyRoomAdmin/${studyroomId}`);
  };

  //삭제(수정)처리
  const closeModalEvent = (event) => {
    event.preventDefault();

    setIsModalOpen(false);

    axios
      .put(`/api/studyrooms/${studyroomId}/delete`, null, {
        params: {
          isDelete: true,
        },
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        openSnackBar();
        navigate(`/`);
      })
      .catch((error) => {
        // 오류 처리
        console.log(Error);
        console.log(error.data);
        alert("스터디방이 삭제되지 않았습니다.");
      });
    navigate(`/StudyRoomAdmin/${studyroomId}`);
  };

  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <HeaderWrap>
          <HeaderBtnWrap>
            <HeaderBtn>
              <TextField
                hiddenLabel
                id="filled-hidden-label-normal"
                defaultValue=""
                variant="filled"
                size="small"
                placeholder={studyroomDto.name} // 상태값으로 설정
                onChange={handleNameChange} // 값이 변경될 때 호출되는 핸들러 함수
              />
              <Button
                sx={{ width: "50px", marginLeft: "10px" }}
                variant="contained"
                color="success"
                onClick={checkStudyroomName}
              >
                중복확인
              </Button>
            </HeaderBtn>
            <StudyRoomTitle>입장코드</StudyRoomTitle>
            <HeaderBtn>
              <TextField
                disabled={studyroomDto.isPublic}
                hiddenLabel
                id="filled-hidden-label-normal"
                defaultValue=""
                variant="filled"
                value={studyroomDto.enterCode}
                size="small"
                helperText={codeValidation() ? "알파벳,숫자 포함하여 8자리로 설정해주세요" : ""}
                inputProps={{
                  maxLength: CHARACTER_LIMIT,
                }}
                onChange={handleEnterCodeChange} // 값이 변경될 때 호출되는 핸들러 함수
              />
              <Typography sx={{ marginLeft: "10px" }}>
                {studyroomDto.enterCode ? studyroomDto.enterCode.length : 0}/{CHARACTER_LIMIT}
              </Typography>
            </HeaderBtn>
          </HeaderBtnWrap>
        </HeaderWrap>

        <ContentWrap>
          <ContentTop>
            <ContentTopLeftWrap>
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
                  sx={{ width: 200, height: 200 }}
                ></Avatar>
              )}
            </ContentTopLeftWrap>
            <ContentTopRightWrap>
              <StudyRoomWrap>
                <StudyRoomTitle>
                  <LockIcon fontSize="large" />
                  공개 여부
                </StudyRoomTitle>
                <StudyRoomContent>
                  <RadioGroup row defaultValue="공개">
                    <Switch checked={studyroomDto.isPublic} onChange={handleIsPublicChange} />
                  </RadioGroup>
                </StudyRoomContent>
              </StudyRoomWrap>
              <StudyRoomWrap>
                <StudyRoomTitle2>
                  <GroupsIcon fontSize="large" />
                  최대 인원
                </StudyRoomTitle2>
                <StudyRoomContent>
                  <IconButton
                    aria-label="minus"
                    onClick={() => handleMaxUserNumChange(studyroomDto.maxUserNum - 1)}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <Item>{studyroomDto.maxUserNum}</Item>
                  <IconButton
                    aria-label="plus"
                    onClick={() => handleMaxUserNumChange(studyroomDto.maxUserNum + 1)}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </StudyRoomContent>
              </StudyRoomWrap>
              <StudyRoomWrap>
                <StudyRoomTitle2>
                  <ForestIcon fontSize="large" />
                  일일 최대 휴식 시간
                </StudyRoomTitle2>
                <StudyRoomContent>
                  <IconButton
                    aria-label="minus"
                    onClick={() => handleMaxRestTimeChange(studyroomDto.maxRestTime - 10)}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <Item>{studyroomDto.maxRestTime}</Item>
                  <IconButton
                    aria-label="plus"
                    onClick={() => handleMaxRestTimeChange(studyroomDto.maxRestTime + 10)}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </StudyRoomContent>
              </StudyRoomWrap>
              <StudyRoomWrap>
                <StudyRoomTitle2>
                  <LocalOfferIcon fontSize="large" />
                  태그
                </StudyRoomTitle2>
                <StudyRoomContent>
                  <MultipleSelectChip
                    selectedTags={studyroomDto.tags || []} // null이면 빈 배열로 설정
                    setSelectedTags={handleTagsChange}
                  />
                </StudyRoomContent>
              </StudyRoomWrap>
            </ContentTopRightWrap>
          </ContentTop>
          <ContentBottom>
            <ContentBottomLeft>
              <ContentBottomTitle>공지사항 관리</ContentBottomTitle>
              <ContentBottomBoard>
                <NoticeContainerWrap>
                  <NoticeContentWrap
                    maxLength={CONTENT_LIMIT}
                    onChange={handleEnterNoticeChange}
                    value={studyroomDto.notice}
                  >
                    {studyroomDto.notice}
                  </NoticeContentWrap>
                  <BtnWrap>
                    <Typography sx={{ marginRight: "10px" }}>
                      {studyroomDto.notice ? studyroomDto.notice.length : 0}/{CONTENT_LIMIT}
                    </Typography>
                  </BtnWrap>
                </NoticeContainerWrap>
              </ContentBottomBoard>
            </ContentBottomLeft>
            <ContentBottomRight>
              <ContentBottomTitle>스터디원 관리</ContentBottomTitle>
              <ContentBottomBoard>
                <MemberTable studyroomId={studyroomId} />
              </ContentBottomBoard>
            </ContentBottomRight>
          </ContentBottom>
        </ContentWrap>

        <FooterWrap>
          <FooterBtnWrap>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              수정
            </Button>
            <div>
              <Button variant="contained" color="error" onClick={openModal}>
                스터디룸 삭제
              </Button>
              <CustomModal isOpen={isModalOpen} closeModal={closeModal}>
                <Box>
                  <Typography variant="h6" component="h2">
                    삭제 시 더 이상 해당 스터디룸이 삭제되며 복구할 수 없습니다.
                    <br />
                    정말 삭제하시겠습니까?
                  </Typography>
                  <Button onClick={(event) => closeModalEvent(event)}>확인</Button>
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
          </FooterBtnWrap>
        </FooterWrap>
      </ContainerWrap>
      <GFooter />
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
const HeaderWrap = styled.div`
  display: flex;
  width: 80%;
  height: 10%;
`;
const HeaderBtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const HeaderBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;
`;

const ContentWrap = styled.div`
  width: 80%;
  height: 80%;
`;
const ContentTop = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  border: 1px solid black;
`;
const ContentTopLeftWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35%;
  height: 100%;
`;
const ContentTopRightWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 65%;
  height: 100%;
`;
const StudyRoomWrap = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
`;
const StudyRoomTitle = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  font-size: 20px;
  font-family: "NanumSquareNeo";
  gap: 1vw;
  margin-left: 5vw;
`;
const StudyRoomContent = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
`;
const StudyRoomTitle2 = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  font-size: 20px;
  font-family: "NanumSquareNeo";
  gap: 1vw;
  margin-left: 5vw;
`;

const ContentBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
  border: 1px solid black;
  gap: 2vw;
`;
const ContentBottomLeft = styled.div`
  width: 46.5%;
  height: 90%;
  border: 3px solid #b2dfdb;
  border-radius: 15px;
  overflow: hidden;
`;
const ContentBottomRight = styled.div`
  width: 46.5%;
  height: 90%;
  border: 3px solid #b2dfdb;
  border-radius: 15px;
  overflow: hidden;
`;
const ContentBottomTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 15%;
  color: white;
  background-color: #b2dfdb;
  padding-left: 2vw;
  font-size: 20px;
  font-family: "NanumSquareNeo";
`;
const ContentBottomBoard = styled.div`
  width: 100%;
  height: 85%;
`;

const FooterWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 10%;
`;
const FooterBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 50%;
  gap: 1vw;
`;
const NoticeContainerWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eee;
`;
const NoticeContentWrap = styled.textarea`
  type: text;
  width: 100%;
  height: 80%;
  font-size: 18px;
  border: 0;
  outline: none;
  resize: none;
  background-color: #eee;
  font-family: "NanumSquareNeo";
`;
const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 15%;
  margin: 0;
  padding: 0;
`;
export default StudyRoomAdmin;
