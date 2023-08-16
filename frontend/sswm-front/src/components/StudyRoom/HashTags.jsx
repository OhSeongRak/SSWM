import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Checkbox from "@mui/joy/Checkbox";
import * as React from "react";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";

export default function CheckboxChip({ onTagClick }) {
  const [selected, setSelected] = React.useState([]);
  const [tagList, setTagList] = React.useState([]);
  const token = JSON.parse(localStorage.getItem("accessToken"));

  useEffect(() => {
    axios
      .get(`{REACT_APP_BASE_URL}/api/tags`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const extractedTags = response.data.map((tag) => tag.name); // name 필드만 추출
        setTagList(extractedTags);
      });
  }, [token]);

  useEffect(() => {
    // selected 값이 변경될 때마다 부모로 새로운 selected 값을 전달
    onTagClick(selected);
  }, [selected, onTagClick]);

  return (
    <Box sx={{ display: "flex", width: "700px", height: "100px", gap: 1, alignItems: "center" }}>
      <Typography
        style={{
          display: "static",
          width: "120px",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
        }}
        level="title-lg"
        id="fav-movie"
        mr={2}
      ></Typography>
      <Box
        role="group"
        aria-labelledby="fav-movie"
        sx={{ display: "flex", flexWrap: "wrap", gap: 1, margin: "2px" }}
      >
        {tagList.map((name) => {
          const checked = selected.includes(name);
          return (
            <Chip
              key={name}
              variant="plain"
              color={checked ? "primary" : "neutral"}
              startDecorator={checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: "none" }} />}
            >
              <Checkbox
                variant="outlined"
                color={checked ? "primary" : "neutral"}
                disableIcon
                overlay
                label={name}
                checked={checked}
                onChange={(event) => {
                  setSelected((names) =>
                    !event.target.checked ? names.filter((n) => n !== name) : [...names, name]
                  );
                }}
              />
            </Chip>
          );
        })}
      </Box>
    </Box>
  );
}
