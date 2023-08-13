import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useEffect } from "react";

export default function FadeMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState("최근순");

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

  useEffect(() => {
    // 부모 컴포넌트인 StudyRoom 컴포넌트에 선택된 메뉴 옵션을 전달하는 콜백 함수 호출
    props.onMenuItemClick(selectedOption);
  }, [selectedOption]);

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{fontFamily:"NanumSquareNeo", fontSize:16, color:"black", paddingRight:0}}
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
