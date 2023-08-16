import React, { useState } from "react";
import styled from "styled-components";

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
import GFooter from "../components/GFooter";
import IconButton from "@mui/material/IconButton";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import axios from "axios";

const StudyRoom = (props) => {
  const [selectedOption, setSelectedOption] = useState("최근순");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isPublic, setIsPublic] = useState(1);
  const [sorting, setSorting] = useState(true);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const handleCanCreate = async () => {
    const roomList = await axios.get(`{process.env.REACT_APP_BASE_URL}/api/studyrooms`, {
      headers: {
        Authorization: accessToken,
      },
    });

    if (roomList.data.length >= 5) {
      alert("가입할 수 있는 스터디룸 개수를 초과하였습니다.");
      return;
    }
    window.location.href = `/CreateStudyRoom`;
  };
  const handleAlarm = () => {
    setSorting(!sorting);
  };

  const handleSearchKeywordChange = (keyword) => {
    setSearchKeyword(keyword);
  };

  const handleMenuItemClick = (option) => {
    setSelectedOption(option);
  };

  const handleSelectedTagsChange = (newSelectedTags) => {
    setSelectedTags(newSelectedTags);
  };

  const handleShowPrivateRoomsChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) setIsPublic(0);
    else setIsPublic(1);
  };

  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <SearchBar style={{}} onSearchKeywordChange={handleSearchKeywordChange} />
        <CheckChip>
          <CheckboxChip onTagClick={handleSelectedTagsChange} />
        </CheckChip>
        <StudyRoomBtn>
          <SortBtn>
            <FadeMenu selectedOption={selectedOption} onMenuItemClick={handleMenuItemClick} />
            <span>
              <IconButton
                aria-label="sort"
                onClick={handleAlarm}
                color="primary"
                sx={{ padding: 0 }}
              >
                {sorting ? <NorthIcon /> : <SouthIcon />}
              </IconButton>
            </span>
          </SortBtn>
          <FormGroup style={{ display: "inline-block" }}>
            <FormControlLabel
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontFamily: "NanumSquareNeo",
                },
              }}
              control={<Checkbox onChange={handleShowPrivateRoomsChange} />}
              label="비공개 스터디룸 표시"
            />
          </FormGroup>
        </StudyRoomBtn>

        <StudyRoomList
          option={selectedOption}
          searchKeyword={searchKeyword}
          selectedTags={selectedTags}
          isPublic={isPublic}
          sorting={sorting}
        />
        <AddBtn onClick={handleCanCreate}>
          <Fab color="primary" aria-label="add" sx={{ zIndex: "tooltip" }}>
            <AddIcon />
          </Fab>
        </AddBtn>
      </ContainerWrap>
      <GFooter />
    </div>
  );
};

const ContainerWrap = styled.div`
  width: 100%;
`;

const CheckChip = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  margin-top: 40px;
  margin-left: 10%;
  margin-right: 10%;
`;

const StudyRoomBtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 80px;
  margin-top: 30px;
`;
const SortBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const AddBtn = styled.div`
  position: fixed;
  bottom: 2.5vw;
  right: 2.5vw;
`;

export default StudyRoom;
