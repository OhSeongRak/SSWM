import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../assets/searchBarButton.svg";

// ... (이전 코드와 동일)

const SearchBar = ({ onSearchKeywordChange }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleButtonClick = () => {
    onSearchKeywordChange(searchKeyword);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearchKeywordChange(searchKeyword);
    }
  };

  return (
    <SearchBarLayout>
      <SearchBarInputWrapper>
        <SearchBarInput
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
        />

        <SearchBarButton onClick={handleButtonClick}>
          {/* <IconButton> */}
          <SearchIcon />
          {/* </IconButton> */}
        </SearchBarButton>
      </SearchBarInputWrapper>
    </SearchBarLayout>
  );
};

// ... (이후 코드와 동일)

const SearchBarLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  margin-botton: 10px;
`;

const SearchBarInputWrapper = styled.div`
  width: 70%;
  display: flex;
  position: relative;
  margin: 0 auto;
  justify-content: flex-end;
`;

const SearchBarInput = styled.input`
  width: 100%;
  padding: 20px 75px 20px 44px;
  background: white;
  border: 3px solid orange;
  border-radius: 35px;
  font-weight: 700;
  font-size: 20px;
  &::placeholder {
    color: #ffc7a1;
    font-weight: 400;
  }
  outline: none;
`;

const SearchBarButton = styled.button`
  display: flex;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  margin-right: 7px;
  background: none;
  padding: 0;
  border: none;
`;

export default SearchBar;
