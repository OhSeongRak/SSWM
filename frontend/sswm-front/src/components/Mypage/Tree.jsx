import React from 'react';
import styled from "styled-components";

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';


const Tree = (props) => {
  return(
    <ContainerWrap>
      <TitleWrap>
        <Title>나무도감</Title>
      </TitleWrap>
      <ContentWrap>
        <TreeListWrap>
          <TreeInfo>
            <TreeImg>
            </TreeImg>
            <TreeName>
              <div>씨앗</div>
              <div>LV.20</div>
            </TreeName>
          </TreeInfo>
          <IconButton aria-label="add" size="large">
            <AddIcon fontSize="inherit" />
          </IconButton>
        </TreeListWrap>
        
      </ContentWrap>
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  width: 100%;
`
const TitleWrap = styled.div`
  font-size: 25px;
  margin-top: 1vw;
  margin-bottom: 1vw;
`
const Title = styled.span`
  border: 2px solid #fecc47;
  border-radius: 15px;
  padding: 3px 3px;
  background: #fecc47;
`
const ContentWrap = styled.div`
  display: flex;
  justify-content: center;
`
const TreeListWrap = styled.div`
  height: 200px;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-direction: row;
  gap: 3vw;
`
const TreeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 200px;
  border: 2px solid orange;
  border-radius: 15px;
`
const TreeImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
  size: 20%;
`
const TreeName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30%;
`

export default Tree;