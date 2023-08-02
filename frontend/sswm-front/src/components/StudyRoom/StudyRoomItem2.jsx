import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { IconButton } from "@mui/material";
import Chip from "@mui/material/Chip";

import def from "../../assets/dolphin.jpg";
import CardHoverMenus from "./FreeRoomHover";

export default function RecipeReviewCard() {
  return (
    <Card>
      <CardHeader
        title="2023.08.02"
        action={
          <IconButton disabled>
            <LocalFireDepartmentIcon sx={{ color: "black" }} />
            <Typography sx={{ color: "black" }}>평균공부시간</Typography>
          </IconButton>
        }
      />
      <CardMedia component="img" height="194" image={def} alt="def" />
      <CardHoverMenus />
      <CardContent>
        <IconButton sx={{ gap: 1 }} disabled>
          <Chip variant="outlined" color="primary" label="코딩" />

          <Chip variant="outlined" color="primary" label="고독방" />

          <Chip variant="outlined" color="primary" label="취준생" />
        </IconButton>
        <IconButton disabled sx={{ float: "right" }}>
          <PeopleAltIcon sx={{ color: "black" }} />
          <Typography sx={{ color: "black" }}>현재인원/총인원</Typography>
        </IconButton>
      </CardContent>
    </Card>
  );
}
