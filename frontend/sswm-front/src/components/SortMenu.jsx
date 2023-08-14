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
    props.onMenuItemClick(selectedOption);
    // eslint-disable-next-line
  }, [selectedOption]);

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ fontSize:16, color:"black", paddingRight:0}}
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
        <MenuItem onClick={handleMenuItemClick("공부시간순")} >공부시간순</MenuItem>
        <MenuItem onClick={handleMenuItemClick("인원순")} >인원순</MenuItem>
        <MenuItem onClick={handleMenuItemClick("최근순")} >최근순</MenuItem>
      </Menu>
    </div>
  );
}
