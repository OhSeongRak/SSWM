import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      
    },
  },
};

function getStyles(name, selectedTags, theme) {
  return {
    fontWeight:
      selectedTags.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ selectedTags, setSelectedTags }) {
  const theme = useTheme();
  const [tags, settags] = useState([]);
  // const [selectedTags , setSelectedTags] = useState([]);

  useEffect(() => {
    // 서버에서 태그 데이터를 가져오는 함수
    const fetchTags = async () => {
      try {
        const response = await axios.get(`{process.env.REACT_APP_BASE_URL}/api/tags`); // 서버의 태그 컨트롤러 엔드포인트로 요청
        settags(response.data); // 가져온 데이터를 chipData 상태로 설정
      } catch (error) {
        console.error("태그 데이터를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchTags(); // 함수 실행
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    console.log(value);
    console.log(tags);

    // 최대 3개
    if (value.length > 3) {
      return;
    }

    setSelectedTags(value);
  };

  const handleDelete = (tagToDelete) => () => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToDelete));
  };


  return (
    <div>
      <FormControl sx={{
          m: 1,
          width: 250,
          '@media screen and (max-width: 1023px)': {
            width: 150, 
          },
          '@media screen and (max-width: 768px)': {
            width: 130, 
          },
          '@media screen and (max-width: 600px)': {
            width: 100, 
          },
          '@media screen and (max-width: 480px)': {
            width: 80, 
          },
        }}
      >
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedTags}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} onDelete={handleDelete(value)} onMouseDown={(event) => {
                  event.stopPropagation();
                }} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {tags.map((tag) => (
            <MenuItem key={tag.id} value={tag.name} style={getStyles(tag.name, tags, theme)}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
