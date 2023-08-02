import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Gnb from "../components/Gnb";
import SearchBar from "../components/SearchBar";
import StudyRoomList from "../components/StudyRoom/StudyRoomList";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FadeMenu from "../components/SortMenu";
import CheckboxChip from "../components/StudyRoom/HashTags";

const StudyRoom = (props) => {
  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <SearchBar />
        <CheckChip>
          <CheckboxChip />
        </CheckChip>
        <StudyRoomBtn>
          <SortBtn>
            <FadeMenu></FadeMenu>
          </SortBtn>
          <FormGroup style={{ display: "inline-block" }}>
            <FormControlLabel
              sx={{ "& .MuiFormControlLabel-label": { fontFamily: "NanumSquareNeo" } }}
              control={<Checkbox />}
              label="비공개 스터디룸 표시"
            />
            <FormControlLabel
              sx={{ "& .MuiFormControlLabel-label": { fontFamily: "NanumSquareNeo" } }}
              control={<Checkbox />}
              label="꽉 찬 스터디룸 표시"
            />
          </FormGroup>
        </StudyRoomBtn>

        <StudyRoomList />
        <AddBtn>
          <Link to="/CreateStudyRoom">
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        </AddBtn>
      </ContainerWrap>
    </div>
  );
};

const ContainerWrap = styled.div`
  width: 100%;
  font-family: "NanumSquareNeo";
`;

const CheckChip = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  margin-top: 40px;
  margin-left: 10%;
  margin-right: 10%;
  font-family: "NanumSquareNeo";
`;

const StudyRoomBtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 80px;
  margin-top: 30px;
`;
const SortBtn = styled.div`
`
const AddBtn = styled.div`
  position: fixed;
  bottom: 1vw;
  right: 1vw;
`;

export default StudyRoom;
