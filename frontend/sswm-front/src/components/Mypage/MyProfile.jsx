import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import ExpBar from "./ExpBar";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import def from "../../assets/fubao.jpg";
import tree from "../../assets/tree.JPG";
// import tree2 from '../../assets/tree2.jpg';
import { useDispatch, useSelector } from "react-redux";

const MyProfile = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const currentExp = 75;
  const maxExp = 100;

  return (
    <ContainerWrap>
      <TitleWrap>
        <Title>내 프로필</Title>
      </TitleWrap>
      <ContentWrap>
        <UserWrap>
          <InfoWrap>
            <InfoImg>
              <Avatar alt="profile Img" src={def} sx={{ width: 100, height: 100 }} />
            </InfoImg>
            <InfoName>A206</InfoName>
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
            <TreeImg src={tree}></TreeImg>

            <TreeName>
              <div>은행 나무</div>
              <div>LV. {profile.level} (250 / 250)</div>
              <button
                onClick={() => {
                  // dispatch에 action을 보내 => store에 전달해주기
                  dispatch({
                    type: "PLUS_ONE",
                  });
                }}
              >
                +
              </button>
            </TreeName>
          </TreeInfo>

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

export default MyProfile;
