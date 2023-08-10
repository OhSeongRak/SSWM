import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import ExpBar from "./ExpBar";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import axios from "axios";
import tree2 from "../../assets/tree2.jpg"

const MyProfile = ({ users }) => {
  const treesName = {
    1: "벚꽃나무",
    2: "등나무",
    3: "은행나무",
    4: "크리스마스나무"
  }
  const [trees, setTrees] = useState([]);
  const [createtrees, setCreateTrees] = useState([]);
  const [isTreeCreated, setIsTreeCreated] = useState(false);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  useEffect(() => {
    axios
      .get("/api/user/trees",{
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
    // axios
    //   .get("/api/trees", {
    //     headers: {
    //       Authorization: accessToken,
    //     },
    //   })
    //   .then((response) => {
    //     console.log("나무이름:::", response.data)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
          console.log(response.data)
          setCreateTrees(response.data.tree.id)
          setIsTreeCreated(true);
          // Use the newly created tree data directly from the response
          const newTree = response.data;
          setTrees(prevTrees => [...prevTrees, newTree]); // Add the new tree to the existing list
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
          <TreeInfo>
            {isTreeCreated ? ( 
              <TreeInfoWrap>
                <TreeImg src={tree2}>
                </TreeImg>
                <TreeName>
                  <div>{treesName[createtrees]}</div>
                  <div>LV.0</div>
                </TreeName>
              </TreeInfoWrap>
            ) : (
              <IconButton aria-label="add" size="large" onClick={CreateTree}>
                <AddIcon fontSize="inherit" />
              </IconButton>
            )}
          </TreeInfo>


          <TreeBalanceWrap>
            <TreeBalanceText>전체 밸런스</TreeBalanceText>
            <TreeBalanceContent>
              <ExpBar value={currentExp} maxValue={maxExp} />
              <div>75%</div>
            </TreeBalanceContent>
            <TreeBalanceText>일일 밸런스</TreeBalanceText>
            <TreeBalanceContent>
              <ExpBar value={currentExp} maxValue={maxExp} />
              <div>75%</div>
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
            // Check if tree.current is false, and render accordingly
            if (!tree.current) {
              return (
                <TreeInfo2 key={tree.id}>
                  <TreeImg src={tree2}></TreeImg>
                  <TreeName>
                    <div>{tree.name}</div>
                    <div>LV.20</div>
                  </TreeName>
                </TreeInfo2>
              );
            } else {
              return null; // Don't render anything if tree.current is true
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
  font-family: "NanumSquareNeo";
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
  font-family: "NanumSquareNeo";
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
