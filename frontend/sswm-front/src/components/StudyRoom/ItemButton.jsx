import { Button, TextField } from "@mui/material";
import React from "react";

const CardHoverButton = (p) => {
  return (
    <div>
      <TextField
        sx={{
          margin: "30px",
          alignItems: "center",
          display: "inline-flex",
          justifyItems: "center",
        }}
        required
        id="outlined-required"
        label="Password"
      />
      <a
        href="/StudyRoomMember"
        type="button"
        onClick={p.clicked}
        className="btn btn-light w-75 m-3 text-left"
      >
        <Button sx={{ margin: "10px", height: "40px", alignItems: "center" }} variant="outlined">
          {p.txt}
        </Button>
      </a>
    </div>
  );
};

export default CardHoverButton;
