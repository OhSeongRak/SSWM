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
  const [trees, setTrees] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  useEffect(() => {
    axios
      .get("/api/user/trees", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log(response.data)
        setTrees(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
      // eslint-disable-next-line
    }, []);
  
  const CreateTree = () => {
    axios
    .post("/api/user/trees", null ,{
      headers: {
        Authorization: accessToken,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  const currentExp = 75;
  const maxExp = 100;
  const imageUrl = `${process.env.REACT_APP_IMAGE_URL}/` + users.image;

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
            <Link to="/EditInfo" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="success">
                회원정보
              </Button>
            </Link>
          </BtnWrap>
        </UserWrap>

        <TreeWrap>
          <TreeInfo></TreeInfo>


          <TreeBalanceWrap>
            <TreeBalanceText>전체 밸런스</TreeBalanceText>
            <TreeBalanceContent>
              <ExpBar value={currentExp} maxValue={maxExp} />
              75%
            </TreeBalanceContent>
            <TreeBalanceText>일일 밸런스</TreeBalanceText>
            <TreeBalanceContent>
              <ExpBar value={currentExp} maxValue={maxExp} />
              75%
            </TreeBalanceContent>
          </TreeBalanceWrap>
        </TreeWrap>
      </ContentWrap>

      <TitleWrap>
        <Title>나무도감</Title>
      </TitleWrap>
      <ContentWrap>
        <TreeListWrap>
        {trees.map((tree) => {
            return (
              <TreeInfo2>
                <TreeImg>
                </TreeImg>
                <TreeName>
                  <div>{tree.tree_id}</div>
                  <div>LV.{tree.exp} (0/250xp)</div>
                </TreeName>
              </TreeInfo2>
            );
          })}
          <IconButton aria-label="add" size="large"
            // onClick={() => dispatch({type: 'CREATE_SEED'})}
            onClick={CreateTree}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
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
  font-family: "NanumSquareNeo";
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
  font-family: "NanumSquareNeo";
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
`;
const TreeInfo2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 200px;
  border: 2px solid orange;
  border-radius: 15px;
`;

const TreeImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
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
  font-family: "NanumSquareNeo";
`;
const TreeBalanceContent = styled.div`
  display: flex;
  width: 70%;
  height: 50%;
  justify-content: center;
  align-items: center;
`;
const TreeListWrap = styled.div`
  height: 200px;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-direction: row;
  gap: 3vw;
`
export default MyProfile;
