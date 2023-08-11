import React, { useState } from "react";
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
import GFooter from "../components/GFooter";

const StudyRoom = (props) => {
  const [selectedOption, setSelectedOption] = useState("인원순");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isPublic, setIsPublic] = useState(1);

  

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
        <SearchBar onSearchKeywordChange={handleSearchKeywordChange} />
        <CheckChip>
          <CheckboxChip onTagClick={handleSelectedTagsChange} />
        </CheckChip>
        <StudyRoomBtn>
          <SortBtn>
            <FadeMenu selectedOption={selectedOption} onMenuItemClick={handleMenuItemClick} />
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
            <FormControlLabel
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontFamily: "NanumSquareNeo",
                },
              }}
              control={<Checkbox />}
              label="꽉 찬 스터디룸 표시"
            />
          </FormGroup>
        </StudyRoomBtn>

        <StudyRoomList
          option={selectedOption}
          searchKeyword={searchKeyword}
          selectedTags={selectedTags}
          isPublic={isPublic}
        />
        <AddBtn>
          <Link to="/CreateStudyRoom">
            <Fab color="primary" aria-label="add" sx={{ zIndex: "tooltip" }}>
              <AddIcon />
            </Fab>
          </Link>
        </AddBtn>
      </ContainerWrap>
      <GFooter/>
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
const SortBtn = styled.div``;
const AddBtn = styled.div`
  position: fixed;
  bottom: 1vw;
  right: 1vw;
`;

export default StudyRoom;
