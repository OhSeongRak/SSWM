import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState("정렬");

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => () => {
    setSelectedOption(option);
    handleClose();
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{fontFamily:"NanumSquareNeo", fontSize:16, color:"black"}}
      >
        {selectedOption}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleMenuItemClick("공부시간순")} sx={{fontFamily: "NanumSquareNeo" }}>공부시간순</MenuItem>
        <MenuItem onClick={handleMenuItemClick("인원순")} sx={{fontFamily: "NanumSquareNeo" }}>인원순</MenuItem>
        <MenuItem onClick={handleMenuItemClick("최근순")} sx={{fontFamily: "NanumSquareNeo" }}>최근순</MenuItem>
      </Menu>
    </div>
  );
}
