import React, { useRef, useState } from "react";
import styled from "styled-components";
import Gnb from "../components/Gnb";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Paper from "@mui/material/Paper";
import { styled as muistyled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import LockIcon from "@mui/icons-material/Lock";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import GroupsIcon from "@mui/icons-material/Groups";
import ForestIcon from "@mui/icons-material/Forest";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import def from "../assets/dolphin.jpg";
import { Avatar, RadioGroup, Switch } from "@mui/material";
import MultipleSelectChip from "../components/StudyRoom/Tags";
import { useDispatch, useSelector } from "react-redux";


const Item = muistyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CreateStudyRoom = () => {
  const dispatch = useDispatch();
  const studyroom = useSelector((state) => state.studyroom);

  const [imageSrc, setImage] = useState(def);

  const imageUp = useRef();

  const onClickImage = () => {
    imageUp.current.click();
  };

  const fileBase = (fileUp) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileUp);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      };
    });
  };

  const [checked, setChecked] = useState(true);
  const [disabled, setAble] = useState(true);

  const handleChange = () => {
    if (checked) {
      setAble(false);
      setChecked(false);
    } else {
      setAble(true);
      setChecked(true);
    }
  };

  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <CreateWrap>
          <CreateContent>
            <ContentWrap>
              <ContentLeftWrap>
                <input
                  type="file"
                  ref={imageUp}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    fileBase(e.target.files[0]);
                  }}
                />
                {imageSrc && (
                  <Avatar
                    onClick={onClickImage}
                    alt="Default Img"
                    src={imageSrc}
                    sx={{ width: 200, height: 200 }}
                  ></Avatar>
                )}
              </ContentLeftWrap>

              <ContentRightWrap>
                <StudyRoomWrap>
                  <StudyRoomTitle>
                    <HomeIcon fontSize="large" />
                    스터디룸 이름
                  </StudyRoomTitle>
                  <StudyRoomContent>
                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-normal"
                      defaultValue=""
                      variant="filled"
                      size="small"
                    />
                  </StudyRoomContent>
                </StudyRoomWrap>
                <StudyRoomWrap>
                  <StudyRoomTitle>
                    <LockIcon fontSize="large" />
                    공개 여부
                  </StudyRoomTitle>
                  <StudyRoomContent>
                    <RadioGroup row defaultValue="공개">
                      <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </RadioGroup>
                  </StudyRoomContent>
                </StudyRoomWrap>
                <StudyRoomWrap>
                  <StudyRoomTitle>
                    <QrCode2Icon fontSize="large" />
                    입장코드
                  </StudyRoomTitle>
                  <StudyRoomContent>
                    <TextField
                      disabled={disabled}
                      hiddenLabel
                      id="filled-hidden-label-normal"
                      defaultValue=""
                      variant="filled"
                      size="small"
                      helperText="알파벳,숫자 포함한 8자리"
                    />
                  </StudyRoomContent>
                </StudyRoomWrap>
              </ContentRightWrap>
            </ContentWrap>

            <ContentWrap2>
              <StudyRoomWrap>
                <StudyRoomTitle2>
                  <GroupsIcon fontSize="large" />
                  최대 인원
                </StudyRoomTitle2>
                <StudyRoomContent>
                  <IconButton aria-label="minus"
                    onClick={() => {
                      dispatch({
                        type: "PERSON_MINUS_ONE",
                      });
                    }}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <Item>{studyroom.personnel}</Item>
                  <IconButton aria-label="plus"
                    onClick={() => {
                      dispatch({
                        type: "PERSON_PLUS_ONE",
                      });
                    }}
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
                <IconButton aria-label="minus"
                    onClick={() => {
                      dispatch({
                        type: "REST_MINUS_TEN",
                      });
                    }}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <Item>{studyroom.resttime}</Item>
                  <IconButton aria-label="plus"
                    onClick={() => {
                      dispatch({
                        type: "REST_PLUS_TEN",
                      });
                    }}
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
                  <MultipleSelectChip />
                </StudyRoomContent>
              </StudyRoomWrap>
            </ContentWrap2>
          </CreateContent>

          <CreateBtn>
            <Button variant="contained" color="success">
              스터디 룸 생성하기
            </Button>
          </CreateBtn>
        </CreateWrap>
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
const CreateWrap = styled.div`
  width: 80%;
  height: 80%;
  border: 1px solid black;
`;
const CreateContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80%;
`;
const ContentWrap = styled.div`
  display: flex;
  width: 80%;
  height: 50%;
`;
const ContentWrap2 = styled.div`
  width: 80%;
  height: 50%;
`;
const ContentLeftWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
`;
const ContentRightWrap = styled.div`
  width: 50%;
  height: 100%;
`;
const StudyRoomWrap = styled.div`
  display: flex;
  width: 100%;
  height: 33.3%;
`;
const StudyRoomTitle = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  font-size: 20px;
  font-family: "NanumSquareNeo";
  gap: 1vw;
`;
const StudyRoomTitle2 = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  height: 100%;
  font-size: 20px;
  font-family: "NanumSquareNeo";
  gap: 1vw;
  margin-left: 10vw;
`;
const StudyRoomContent = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
`;
const CreateBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
`;
export default CreateStudyRoom;
