import React from "react";
import CardHoverMenus from "./ItemMenu";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import def from "../../assets/dolphin.jpg";
import { Chip, IconButton, Typography } from "@mui/material";

//----====---------------------------------------------------
const Card = () => {
  return (
    <div className="col-sm-6 col-md-6 col-lg-4 mt-4">
      <div className="card">
        <div className="card-block">
          <Typography className="card-title">2023.08.02</Typography>
          <IconButton disabled>
            <LocalFireDepartmentIcon sx={{ color: "black" }} />
            <Typography sx={{ color: "black" }}>평균공부시간</Typography>
          </IconButton>
        </div>
        <img
          alt="random pic"
          className="card-img-top"
          src={def}
          style={{ minWidth: 200, minHeight: 150 }}
        />
        <CardHoverMenus />
        <div className="card-footer">
          <IconButton sx={{ gap: 1 }} disabled>
            <Chip variant="outlined" color="primary" label="코딩" />

            <Chip variant="outlined" color="primary" label="고독방" />

            <Chip variant="outlined" color="primary" label="취준생" />
          </IconButton>
          <IconButton disabled sx={{ justifyContent: "end" }}>
            <PeopleAltIcon sx={{ justifyContent: "end", color: "black" }} />
            <Typography sx={{ justifyContent: "end", color: "black" }}>현재인원/총인원</Typography>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Card;
