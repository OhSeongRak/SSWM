import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Checkbox from "@mui/joy/Checkbox";
import * as React from "react";
import { Typography } from "@mui/material";

export default function CheckboxChip() {
  const [selected, setSelected] = React.useState([]);

  const tag = [
    "Star trek",
    "Batman",
    "Spider man",
    "Eternals",
    "Shang chi",
    "Jungle cruise",
    "No time to die",
    "Thor",
    "The hulk",
    "Star trek2",
    "Batman2",
    "Spider man2",
    "Eternals2",
    "Shang chi2",
    "Jungle cruise2",
    "No time to die2",
    "Thor2",
    "The hulk2",
    "Thor3",
    "The hulk3",
  ];

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
        }}
        level="title-lg"
        id="fav-movie"
        mr={2}
      >
        검색태그(최대3개)
      </Typography>
      <Box
        role="group"
        aria-labelledby="fav-movie"
        sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
      >
        {tag.map((name) => {
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
                  if (selected.length > 2) {
                    setSelected(selected.filter((n) => n !== name));
                    event.target.checked = false;
                  }
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
