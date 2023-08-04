import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

import def from "../../assets/dolphin.jpg";

const StudyRoomItem = (props) => {
  return (
    <StudyRoomItemLayout>
      <Card sx={{ minWidth: 275, border: 1 }}>
        <CardMedia component="img" height="140" image={def} alt="def" />
        <CardContent>
          <Typography
            sx={{ fontSize: 14, fontFamily: "NanumSquareNeo" }}
            color="text.secondary"
            gutterBottom
          >
            2023.07.21~
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontFamily: "NanumSquareNeo" }}
            color="text.secondary"
            gutterBottom
          >
            평균공부시간
          </Typography>

          <Typography sx={{ fontFamily: "NanumSquareNeo" }} variant="h5" component="div">
            Card Section 나누기
          </Typography>

          <Typography sx={{ mb: 1.5, fontFamily: "NanumSquareNeo" }} color="text.secondary">
            # 태그 넣을 자리
          </Typography>
          <Typography sx={{ mb: 1.5, fontFamily: "NanumSquareNeo" }} color="text.secondary">
            현재인원/총인원
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/StudyRoomMember" style={{ textDecoration: "none" }}>
            <Button sx={{ fontFamily: "NanumSquareNeo" }} size="small">
              입장하기
            </Button>
          </Link>
        </CardActions>
      </Card>
    </StudyRoomItemLayout>
  );
};

const StudyRoomItemLayout = styled.div`
  padding: 15px 13px;
  display: block;
  width: 300px;
  gap: 10px;
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 10px;
  cursor: pointer;
`;

export default StudyRoomItem;
