import React from "react";
import styled from "styled-components";
import Gnb from "../components/Gnb";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Paper from '@mui/material/Paper';
import { styled as muistyled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import GroupsIcon from '@mui/icons-material/Groups';
import ForestIcon from '@mui/icons-material/Forest';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import def from '../assets/dolphin.jpg';

const Item = muistyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const CreateStudyRoom = () => {
  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <CreateWrap>
          <CreateContent>
            <ContentWrap>
              <ContentLeftWrap>
                <StudyRoomImg src={def}/>
              </ContentLeftWrap>

              <ContentRightWrap>
                <StudyRoomWrap>
                  <StudyRoomTitle>
                    <HomeIcon fontSize="large"/>
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
                    <FormControlLabel control={<Checkbox  />} label="공개" />
                    <FormControlLabel control={<Checkbox  />} label="비공개" />
                  </StudyRoomContent>
                </StudyRoomWrap>
                <StudyRoomWrap>
                  <StudyRoomTitle>
                    <QrCode2Icon fontSize="large" />
                    입장코드
                  </StudyRoomTitle>
                  <StudyRoomContent>
                    <TextField
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
                  <IconButton aria-label="minus">
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <Item>00</Item>
                  <IconButton aria-label="plus">
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
                  <IconButton aria-label="minus">
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <Item>00</Item>
                  <IconButton aria-label="plus">
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
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-normal"
                    defaultValue=""
                    variant="filled"
                    size="small"
                  />
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
`
const CreateWrap = styled.div`
  width: 80%;
  height: 80%;
  border: 1px solid black;
`
const CreateContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80%;
`
const ContentWrap = styled.div`
  display: flex;
  width: 80%;
  height: 50%;
`
const ContentWrap2 = styled.div`
  width: 80%;
  height: 50%;
`
const ContentLeftWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
`
const StudyRoomImg = styled.img`
  height: 90%
`
const ContentRightWrap = styled.div`
  width: 50%;
  height: 100%;
`
const StudyRoomWrap = styled.div`
  display: flex;
  width: 100%;
  height: 33.3%;
`
const StudyRoomTitle = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  font-size: 20px;
  font-family: "NanumSquareNeo";
  gap: 1vw;
`
const StudyRoomTitle2 = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  font-size: 20px;
  font-family: "NanumSquareNeo";
  gap: 1vw;
  margin-left: 10vw;
`
const StudyRoomContent = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
`
const CreateBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
`
export default CreateStudyRoom;