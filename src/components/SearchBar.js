import React, { useState, useRef, useEffect } from "react";
import { TextField, Button, Box, FormControl, Select, MenuItem } from "@mui/material";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("musicTrack"); // default: Música
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term, filter);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        mt: 2,
        mb: 2,
        px: 2,
      }}
    >
      <TextField
        inputRef={inputRef}
        variant="outlined"
        placeholder="Buscar músicas ou álbuns..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        sx={{
          width: { xs: "100%", sm: "320px", md: "380px" },
          bgcolor: "background.paper",
          borderRadius: 1,
          input: { fontSize: { xs: 16, sm: 18 } },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#1DB954",
            },
            "&:hover fieldset": {
              borderColor: "#1DB954",
              borderWidth: 2,
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1DB954",
              borderWidth: 2,
            },
          },
        }}
      />

      <FormControl
        sx={{
          minWidth: { xs: "100%", sm: 140 },
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{
            fontSize: { xs: 14, sm: 16 },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1DB954",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1DB954",
              borderWidth: 2,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1DB954",
              borderWidth: 2,
            },
          }}
        >
          <MenuItem value="musicTrack">Música</MenuItem>
          <MenuItem value="album">Álbum</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "#1db954",
          color: "#fff",
          fontSize: { xs: 14, sm: 16 },
          px: 3,
          py: 1.2,
          "&:hover": { bgcolor: "#17a348" },
          mt: { xs: 0, sm: 0 },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        Buscar
      </Button>
    </Box>
  );
}

export default SearchBar;
