import React from "react";
import CardHoverMenus from "./ItemMenu";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

// import def from "../../assets/dolphin.jpg";
import { Chip, IconButton, Typography } from "@mui/material";

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}

//----====---------------------------------------------------
const Card = ({studyroom}) => {
  const timestamp = studyroom.createdTime; // Unix timestamp
  const dateObject = new Date(timestamp * 1000); // Unix timestamp를 밀리초 단위로 변환해야 함
  const formattedDate = dateObject.toLocaleDateString(); // 날짜만 포맷으로 변환
  const imageUrl = `${process.env.REACT_APP_IMAGE_URL}/` + studyroom.image;
  const studyAvgTime = formatTime(studyroom.studyAvgTime);
  
  return (
    <div className="col-sm-6 col-md-6 col-lg-4 mt-4">
      <div className="card">
        <div className="card-block"style={{"display":"flex",flexDirection: "column", padding:"0.5em"}}>
          <div style={{display:"flex",justifyContent: "flex-end"}}>
            <div style={{display:"flex"}}>
            <LocalFireDepartmentIcon sx={{ color: "gray" }} />
            <Typography  sx={{ color: "gray" ,"display":"flex" }}>{studyAvgTime}</Typography>
            </div>
          </div>
          <div style={{display:"flex",justifyContent: "center"}}>
            <Typography variant="h5"sx={{ color: "black" }}>{studyroom.name}</Typography>
          </div>

        </div>
        <img
          alt="random pic"
          className="card-img-top"
          src={imageUrl}
        />
        {/**/}
        <CardHoverMenus studyroom = {studyroom}/>
        <div className="card-footer">
        <div disabled   style={{display:"flex",justifyContent: "space-between"}}>
            <Typography className="card-title">{formattedDate} ~ </Typography>
            <div style={{display:"flex"}}>
              <PeopleAltIcon sx={{ justifyContent: "end", color: "black" }} />
              <Typography sx={{ justifyContent: "end", color: "black" }}>&nbsp; {studyroom.userNum} / {studyroom.maxUserNum}</Typography>
            </div>
         </div>

          <IconButton sx={{ gap: 1 }} disabled style={{"padding":"0px"}}>
          {studyroom.tagNames.map((tagName) => (
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
              style={{  visibility: "hidden"}}
            />
          </IconButton>

      
        </div>
      </div>
    </div>
  );
};

export default Card;
