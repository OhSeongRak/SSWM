import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ExpBar from "./ExpBar";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import axios from "axios";

const MyProfile = ({ users }) => {
  const [trees, setTrees] = useState([
    {
      dayExp: 0,
      userExp: 0,
      image: "",
      name: "",
      current: false,
    },
  ]);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/user/trees`,{
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log("내나무:::",response.data)
        setTrees(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
      // eslint-disable-next-line
    }, []);
    
  
  const CreateTree = () => {
    console.log("trees : "+trees);
    const hasCurrentTree = trees.some(tree => tree.current);
    
    if (!hasCurrentTree) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/user/trees`, null ,{
          headers: {
            Authorization: accessToken,
          },
        })
        .then((response) => {
          console.log("여기",response.data)
          const newTree = response.data;
          setTrees(prevTrees => [...prevTrees, newTree]);     
        })
        .catch((error) => {
          console.log(error);
          alert("모든 나무를 다 키웠습니다.");
        });
    } else {
      console.log("A current tree already exists.");
    }
  };
  const imageUrl = `${process.env.REACT_APP_IMAGE_URL}/` + users.image;
  const existingTree = trees.find(tree => tree.current);
 

  function calculateLevel(currentExp){
    let level;
    let NextExp;

    if(currentExp < 100) {
      level = 1;
      NextExp = 100;
    } else if(currentExp < 200){
      level = 2;
      NextExp = 200;
    } else if(currentExp < 300){
      level = 3;
      NextExp = 300;
    } else if(currentExp < 400){
      level = 4;
      NextExp = 400;
    } else if(currentExp < 550){
      level = 5;
      NextExp = 550;
    } else if(currentExp < 700){
      level = 6;
      NextExp = 700;
    } else if(currentExp < 850){
      level = 7;
      NextExp = 850;
    } else if(currentExp < 1000){
      level = 8;
      NextExp = 1000;
    } else if(currentExp < 1150){
      level = 9;
      NextExp = 1150;
    } else if(currentExp < 1350){
      level = 10;
      NextExp = 1350;
    } else if(currentExp < 1550){
      level = 11;
      NextExp = 1550;
    } else if(currentExp < 1750){
      level = 12;
      NextExp = 1750;
    } else if(currentExp < 1950){
      level = 13;
      NextExp = 1950;
    } else if(currentExp < 2150){
      level = 14;
      NextExp = 2150;
    } else if(currentExp < 2400 ){
      level = 15;
      NextExp = 2400;
    } else if(currentExp < 2650){
      level = 16;
      NextExp = 2650;
    } else if(currentExp < 2900){
      level = 17;
      NextExp = 2900;
    } else if(currentExp < 3150){
      level = 18;
      NextExp = 3150;
    } else if(currentExp < 3400){
      level = 19;
      NextExp = 3400;
    } else{
      level = 20;
    }
    return [level, NextExp]
  }
  return (
    <ContainerWrap>
      <TitleWrap>
        <Title>내 프로필</Title>
      </TitleWrap>
      <ContentWrap>
        <UserWrap>
          <InfoWrap>
            <InfoImg> 
              <Avatar alt="profile Img" src={imageUrl} sx={{ width: 100, height: 100 }} />
            </InfoImg>
            <InfoName>{users.nickname}</InfoName>
          </InfoWrap>

          <BtnWrap>
            <Link to="/EditInfo">
                <Button variant="contained" color="success">
                  회원정보
                </Button>
            </Link>
          </BtnWrap>
        </UserWrap>

        <TreeWrap>
          {existingTree ? (
            <TreeInfo>
              <TreeInfoWrap>
                <TreeImg src={existingTree.image} />
                <TreeName>
                  <div>{existingTree.name}</div>
                  {existingTree ? ( // Check if userTreeDto is defined
                    <div>
                      <div>LV. {calculateLevel(existingTree.userExp)[0]}</div>
                    </div>
                  ) : null}
                </TreeName>
              </TreeInfoWrap>
            </TreeInfo>
          ) : (
            <TreeInfo>
              <IconButton aria-label="add" size="large" onClick={CreateTree}>
                <AddIcon fontSize="inherit" />
              </IconButton>
            </TreeInfo>
          )}

{existingTree ?
          (<TreeBalanceWrap>
            <TreeBalanceText>일일 EXP ({existingTree.dayExp}/100)</TreeBalanceText>
            <TreeBalanceContent>
              <ExpBar value={existingTree.dayExp} maxValue={100} />
              <div>{existingTree.dayExp}%</div>
            </TreeBalanceContent>
            <TreeBalanceText>전체 EXP ({existingTree.userExp}/{calculateLevel(existingTree.userExp)[1]})</TreeBalanceText>
            <TreeBalanceContent>
              <ExpBar value={existingTree.userExp} maxValue={calculateLevel(existingTree.userExp)[1]} />
              <div>{Math.floor((existingTree.userExp)/(calculateLevel(existingTree.userExp)[1])*100)}%</div>
            </TreeBalanceContent>
          </TreeBalanceWrap>
          ):(
          <TreeBalanceWrap>
            <TreeBalanceText>일일 EXP (0/100)</TreeBalanceText>
            <TreeBalanceContent>
              <ExpBar value={0} maxValue={100} />
              <div>0%</div>
            </TreeBalanceContent>
            <TreeBalanceText>전체 EXP (0/100)</TreeBalanceText>
            <TreeBalanceContent>
              <ExpBar value={0} maxValue={100} />
              <div>0%</div>
            </TreeBalanceContent>
          </TreeBalanceWrap>
          )}
        </TreeWrap>
      </ContentWrap>

      <TitleWrap>
        <Title>나무도감</Title>
      </TitleWrap>
      <ContentWrap>
        <TreeListWrap>
          {trees.map((tree) => {
            if (!tree.current) {
              return (
                <TreeInfo2 key={tree.name}>
                  <TreeImg src={tree.image}></TreeImg>
                  <TreeName>
                    <div>{tree.name}</div>
                    {tree ? (
                      <div>LV. {calculateLevel(tree.userExp)}</div>
                    ) : null}
                  </TreeName>
                </TreeInfo2>
              );
            } else {
              return null;
            }
          })}

          
        </TreeListWrap>
      </ContentWrap>
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  width: 100%;
`;

const TitleWrap = styled.div`
  font-size: 25px;
  margin-top: 1vw;
  margin-bottom: 1vw;
`;
const Title = styled.span`
  border: 2px solid #fecc47;
  border-radius: 15px;
  padding: 3px 3px;
  background: #fecc47;
`;
const ContentWrap = styled.div`
  display: flex;
  gap: 5%;
  justify-content: center;
`;
const UserWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 200px;
  border: 2px solid orange;
  border-radius: 15px;
`;
const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
`;
const InfoImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
`;
const InfoName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30%;
  font-size: 25px;
`;
const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 20%;
  margin-right: 0.5vw;
  margin-bottom: 0.5vw;
`;
const TreeWrap = styled.div`
  display: flex;
  width: 70%;
  height: 200px;
  border: 2px solid orange;
  border-radius: 15px;
`;
const TreeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  overflow: hidden;
`;
const TreeInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
const TreeInfo2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 200px;
  border: 2px solid orange;
  border-radius: 15px;
  overflow: hidden;
`;

const TreeImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60%;
`;
const TreeName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30%;
`;
const TreeBalanceWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
`;
const TreeBalanceText = styled.span`
  width: 90%;
`;
const TreeBalanceContent = styled.div`
  display: flex;
  width: 90%;
  height: 30%;
  justify-content: center;
  align-items: center;
  gap: 1vw;
`;
const TreeListWrap = styled.div`
  height: 200px;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-direction: row;
  gap: 3vw;
`
export default MyProfile;
