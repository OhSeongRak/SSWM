import React from "react";
import CardHoverMenus from "./ItemMenu";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import styled from "styled-components";

// import def from "../../assets/dolphin.jpg";
import { Chip, IconButton, Typography } from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
}

//----====---------------------------------------------------
const Card = ({ studyroom, isMyPage }) => {
  const timestamp = studyroom.createdTime; // Unix timestamp
  const dateObject = new Date(timestamp * 1000); // Unix timestamp를 밀리초 단위로 변환해야 함
  const formattedDate = dateObject.toLocaleDateString(); // 날짜만 포맷으로 변환
  const imageUrl = `${process.env.REACT_APP_IMAGE_URL}/` + studyroom.image;
  const studyAvgTime = formatTime(studyroom.studyAvgTime);

  return (
    <div
      className="col-sm-6 col-md-6 col-lg-4 mt-4"
      style={{
        boxShadow: "5px 5px 10px 5px #eeeeee",
        borderRadius: "5px",
        width: "95%",
        height: "90%",
        marginBottom: "10px",
      }}
    >
      <div className="card">
        <CardBlock>
          <div
            style={{
              flexDirection: "column",
              marginTop: "5px",
              marginLeft: "5px",
              marginRight: "10px",
            }}
          >
            <div style={{ display: "flex", float: "left" }}>
              {studyroom.public === false && (
                <div>
                  <LockIcon />
                </div>
              )}
            </div>

            <div style={{ justifyContent: "end", display: "flex" }}>
              <LocalFireDepartmentIcon sx={{ color: "#FA990E" }} />
              <Typography sx={{ color: "#FA990E" }}>{studyAvgTime}</Typography>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
            <Typography variant="h5" sx={{ color: "black" }}>
              {studyroom.name}
            </Typography>
          </div>
        </CardBlock>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CardImg alt="random pic" src={imageUrl} />
        </div>
        <CardHoverMenus studyroom={studyroom} isMyPage={isMyPage} />
        <div className="card-footer">
          <div disabled style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography className="card-title">{formattedDate} ~ </Typography>
            <div style={{ display: "flex" }}>
              <PeopleAltIcon sx={{ justifyContent: "end", color: "black" }} />
              <Typography sx={{ justifyContent: "end", color: "black" }}>
                &nbsp; {studyroom.userNum} / {studyroom.maxUserNum}
              </Typography>
            </div>
          </div>

          <IconButton sx={{ gap: 1 }} disabled style={{ padding: "0px" }}>
            {studyroom.tagNames &&
              studyroom.tagNames.map((tagName) => (
                <Chip
                  key={tagName} // 각 Chip 컴포넌트에 고유한 key prop을 설정해야 합니다.
                  variant="outlined"
                  color="primary"
                  size="small"
                  label={tagName}
                />
              ))}
            <Chip
              variant="outlined"
              color="primary"
              size="small"
              style={{ visibility: "hidden" }}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
const CardImg = styled.img`
  display: block;
  width: 100%;
  height: 230px;
`;
const CardBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
`;

export default Card;
