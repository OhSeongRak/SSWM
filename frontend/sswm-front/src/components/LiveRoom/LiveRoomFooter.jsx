import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import { styled as muistyled } from "@mui/material/styles";
import Popper from '@mui/material/Popper';
import Paper from "@mui/material/Paper";
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";


const LiveRoomFooter = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  const Item = muistyled(Paper)(({ theme }) => ({
    textAlign: "center",
  }));

  return (
    <ContainerWrap>
      <FooterTitle>
        <Link to="/Streching">
          <Button sx={{ color: 'white' }}>
            스트레칭
          </Button>
        </Link>
      </FooterTitle>
      <FooterTitle>
        <Button aria-describedby={id} type="button" onClick={handleClick} sx={{ color: 'white' }} >
          휴식설정
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Box sx={{ border: 2, p: 1, bgcolor: 'background.paper', borderRadius: '16px', borderColor: 'orange' }}>
                <TimerWrap>
                  <IconButton aria-label="minus">
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <Item>0</Item>
                  <span>분</span>
                  <IconButton aria-label="plus">
                    <AddCircleOutlineIcon />
                  </IconButton>
                </TimerWrap>
                <TimerBtnWrap>
                  <Button variant="contained" color="success">적용</Button>
                </TimerBtnWrap>
              </Box>
            </Fade>
          )}
        </Popper>
      </FooterTitle>
      <FooterTitle>
        <Link to="/">
          <Button sx={{ color: 'white' }}>
            나가기
          </Button>
        </Link>
      </FooterTitle>
    </ContainerWrap>
  )
}

const ContainerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: green;
  color: white;
  gap: 5vw;
`
const FooterTitle = styled.div`
`
const TimerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;
`
const TimerBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export default LiveRoomFooter;